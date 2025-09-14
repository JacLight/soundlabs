const appmintConfig = {
  MAX_ATTACHMENT_SIZE: process.env.MAX_ATTACHMENT_SIZE,
  useAppEngine: true,
  appengine: {
    host: process.env.APPENGINE_ENDPOINT,
    appId: process.env.APP_ID,
    key: process.env.APP_KEY,
    secret: process.env.APP_SECRET,
    apiKey: process.env.APPENGINE_API_KEY,
  },
  siteURL: process.env.SITE_URL,
  orgId: process.env.ORG_ID,
  siteName: process.env.SITE_NAME,
  domainAsOrg: process.env.DOMAIN_AS_ORG,
  defaultLocale: process.env.DEFAULT_LOCALE,
  defaultTitle: process.env.DEFAULT_TITLE,
  defaultDescription: process.env.DEFAULT_DESCRIPTION,
  dashboardURL: process.env.STUDIO_MANAGER_URL,
};

if (appmintConfig) {
  // console.log('*** ACTIVE APP CONFIG **** ');
  const {
    siteName,
    siteURL,
    orgId,
    appengine: { host: appEngineURL, appId },
  } = appmintConfig;
  // console.log({ siteName, appId, siteURL, orgId, appEngineURL });
} else {
  console.error('*** ERROR No App Config **** ');
}

export { appmintConfig };
