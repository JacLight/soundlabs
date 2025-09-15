import { appmintConfig } from "./appmint-config";
import axios from "axios";
import { deepCopy } from "./utils/helpers";
import { activeSession } from "./active-session";
import { appmintEndpoints } from "./appmint-endpoints";
import { getProxiedUrl } from "./utils/proxy-utils";

export class AppEngineClient {
  private renewTries = 0;
  private token: string | null = null;

  constructor(private appConfig: any) {}

  async getAppToken() {
    try {
      const { appId, secret, key } = this.appConfig.appengine;
      if (!appId || !secret || !key) {
        console.error("App Id | App Secret || App Key not found");
        return null;
      }
      const path = getProxiedUrl(
        appmintEndpoints.appkey.path,
        this.appConfig.appengine.host
      );
      let data = {
        appId: this.appConfig.appengine.appId,
        secret: this.appConfig.appengine.secret,
        key: this.appConfig.appengine.key,
      };
      this.renewTries = this.renewTries + 1;
      const rt = await axios.post(path, data, this.getBaseHeader());
      if (rt?.data?.token) {
        return rt.data.token;
      } else {
        console.error("invalid  App Key | App Secret || App Id");
        return null;
      }
    } catch (err) {
      console.error("Error getting App Token", err);
      return null;
    }
  }

  getBaseHeader(): { headers: any } {
    return {
      headers: {
        "Content-Type": "application/json",
        orgid: this.appConfig.orgId,
        domainAsOrg: this.appConfig.domainAsOrg,
        "x-api-key": this.appConfig.appengine.apiKey,
        "shared-org-id": this.appConfig.orgId,
      },
    };
  }

  async getHeaderWithToken() {
    if (!this.token && !this.appConfig.appengine.apiKey) {
      this.token = await this.getAppToken();
    }
    const init = this.getBaseHeader();
    if (this.token) {
      init.headers["Authorization"] = `Bearer ${this.token}`;
    }
    return deepCopy(init);
  }

  async processRequest(
    method: string,
    clientPath: string,
    clientData?: any,
    clientAuthorization?: string | null,
    clientQuery?: any,
    clientInfo?: any,
    isMultiPath?: boolean
  ): Promise<any> {
    if (typeof window !== "undefined") {
      return await this.processRequestClient(method, clientPath, clientData);
    } else {
      return await this.processRequestServer(
        method,
        clientPath,
        clientData,
        clientAuthorization,
        clientQuery,
        clientInfo,
        isMultiPath
      );
    }
  }

  async processRequestClient(
    method: string,
    clientPath: string,
    clientData?: any
  ): Promise<any> {
    const path = getProxiedUrl(clientPath, "");

    console.log("client request starting  -> ", method, path);

    const data = clientData || {};

    const clientToken = activeSession.getToken();
    const header = {
      headers: {
        "Content-Type": "application/json",
        ...(clientToken ? { Authorization: `Bearer ${clientToken}` } : {}),
        "x-client-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    let rt;
    method = method.toLowerCase();
    try {
      if (method === "post") {
        rt = await axios.post(path, data, header);
      } else if (method === "put") {
        rt = await axios.put(path, data, header);
      } else if (method === "get") {
        rt = await axios.get(path, header);
      } else if (method === "delete") {
        rt = await axios.delete(path, header);
      }
      this.renewTries = 0;
      console.log("client request success -> ", method, clientPath);
      return this.processResponse(rt);
    } catch (err) {
      const error = err as any;
      throw error;
    }
  }

  async processRequestServer(
    method: string,
    clientPath: string,
    clientData?: any,
    clientAuthorization?: string | null,
    clientQuery?: any,
    clientInfo?: any,
    isMultiPath?: boolean
  ): Promise<any> {
    const path = getProxiedUrl(clientPath, this.appConfig.appengine.host);
    console.log("server request starting  -> ", method, clientPath, path);

    const header: any = await this.getHeaderWithToken();
    if (clientAuthorization) {
      header.headers["x-client-authorization"] = clientAuthorization;
    }
    if (clientInfo) {
      header.headers["x-client-info"] = JSON.stringify(clientInfo);
      header.headers["x-client-host"] = clientInfo["host"];
      header.headers["x-client-protocol"] = clientInfo["protocol"];
      header.headers["x-client-timezone"] = clientInfo["timezone"];
    }

    if (isMultiPath) {
      header.headers["Content-Type"] = "multipart/form-data";
    }
    const data = clientData;
    if (data) {
      data.clientQuery = clientQuery;
    }
    method = method.toLowerCase();
    console.log("server request starting  -> ", method, clientPath, path);
    let rt;
    try {
      if (method === "post") {
        rt = await axios.post(path, data, header);
      } else if (method === "put") {
        rt = await axios.put(path, data, header);
      } else if (method === "get") {
        rt = await axios.get(path, header);
      } else if (method === "delete") {
        rt = await axios.delete(path, header);
      }
      this.renewTries = 0;
      console.log("server request success -> ", method, clientPath);
      return this.processResponse(rt);
    } catch (err) {
      const error = err as any;
      // console.error('request error -> ', clientPath, error.message);
      if (
        this.renewTries < 2 &&
        error?.response?.status === 401 &&
        error?.response?.statusText === "Unauthorized"
      ) {
        console.log("Appengine Token Expired,.... renewing token");
        this.token = null;
        await this.getHeaderWithToken();
        console.log("auth ok");
        return await this.processRequestServer(
          method,
          clientPath,
          clientData,
          clientAuthorization,
          clientQuery,
          clientInfo,
          isMultiPath
        );
      } else {
        throw error;
      }
    }
  }

  async getSite(hostName: string) {
    const sharedHost = this.appConfig.domainAsOrg ? this.appConfig.orgId : "";
    let sitePath = `${appmintEndpoints.get_site.path}/${
      this.appConfig.siteName
    }/${hostName}${sharedHost ? "?shared-host=" + sharedHost : ""}`;
    return await this.processRequestServer("get", sitePath);
  }

  async getPage(
    hostName: string,
    siteName: string,
    paths: string,
    query?: string,
    clientInfo?: any
  ) {
    const sharedHost = this.appConfig.domainAsOrg ? this.appConfig.orgId : "";
    let pagePath = `${appmintEndpoints.get_page.path}/${hostName}/${siteName}${
      paths ? "/" + paths : ""
    }`;
    if (query) {
      pagePath = `${pagePath}?${query}&en=true${
        sharedHost ? "&shared-host=" + sharedHost : ""
      }`;
    } else {
      pagePath = `${pagePath}?en=true${
        sharedHost ? "&shared-host=" + sharedHost : ""
      }`;
    }

    if (clientInfo) {
      clientInfo["host"] = hostName;
    } else {
      clientInfo = { host: hostName };
    }
    return await this.processRequestServer(
      "get",
      pagePath,
      null,
      null,
      null,
      clientInfo
    );
  }

  async getPreviewPage(
    orgId: string,
    site: string,
    page: string,
    token: string
  ) {
    return await this.processRequestServer(
      "get",
      `tools/preview/${orgId}/${site}/${page}?token=${token}`
    );
  }

  async findDataByAttribute(
    datatype,
    attrName: any,
    attrValue,
    options: any
  ): Promise<any> {
    let url = `${appmintEndpoints.find_by_attribute.path}/${datatype}${
      attrName && attrValue ? `/${attrName}/${attrValue}` : ""
    }`;
    return await this.processRequest("get", url, { options });
  }
  async findData(datatype, query: any, options?: any): Promise<any> {
    let url = `${appmintEndpoints.find.path}/${datatype}`;
    return await this.processRequest("post", url, { query, options });
  }

  async search(datatype, keyword, query, options) {
    let url = `${appmintEndpoints.search.path}/${datatype}`;
    return await this.processRequest("post", url, { query, options });
  }

  async getById(datatype: string, id: string) {
    return await this.processRequest(
      "get",
      `${appmintEndpoints.get.path}/${datatype}/${id}`
    );
  }

  async saveData(data: any): Promise<any> {
    let sitePath = `${
      data?.sk ? appmintEndpoints.update.path : appmintEndpoints.create.path
    }/${this.appConfig.siteName}`;
    return await this.processRequest("post", sitePath);
  }

  async logData(data: any) {
    const sitePath = `${appmintEndpoints.batch_log_data}`;
    const rt: any = await this.processRequestServer(
      "post",
      sitePath,
      data,
      null,
      null
    );
    if (rt && Array.isArray(rt.data) && rt.data.length > 0) {
      const [site] = rt.data;
      return site;
    }
    return null;
  }

  async upload(path: string, location: string, file: any): Promise<any> {
    console.debug("request -> updateData", path);
    const formData = new FormData();
    formData.append("location", location);
    formData.append("files", file);

    // Get the proxied URL if needed
    const proxyPath = getProxiedUrl(path, this.appConfig.appengine.host);

    // let rt = await axios.post(path, formData, getHeaderToken());
    try {
      let rt = await fetch(proxyPath, {
        method: "POST",
        headers: new Headers({
          ...((await this.getHeaderWithToken()) as Record<string, any>),
        }),
        body: formData,
      });

      if (rt.ok) {
        return rt.json();
      } else {
        throw new Error(rt.statusText);
      }
    } catch (err) {
      const error = err as any;
      if (
        this.renewTries < 2 &&
        error.statusCode === "401" &&
        error.message === "jwt expired"
      ) {
        console.log("Appengine Token Expired,.... renewing token");
        this.token = null;
        return await this.upload(path, location, file);
      } else {
        console.error(error.message);
        return error;
      }
    }
  }

  processResponse(response: any) {
    if (
      response &&
      (response.status === 200 ||
        response.status === 201 ||
        response.status === 202 ||
        response.statusText)
    ) {
      console.log("response success -> ", response.status, response.statusText);
      return Array.isArray(response) ? response : response.data;
    }
    return response;
  }
}

let appEngineClient: AppEngineClient;
export const getAppEngineClient = (): AppEngineClient => {
  if (!appEngineClient) {
    appEngineClient = new AppEngineClient(appmintConfig);
  }
  return appEngineClient;
};
