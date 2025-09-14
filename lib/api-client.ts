import axios from 'axios';

const API_BASE = '/api';

export const apiClient = {
  // All requests go through our catch-all API route which uses AppEngineClient
  async request(method: string, path: string, data?: any) {
    const response = await axios({
      method,
      url: `${API_BASE}/${path}`,
      data,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  },

  // Just pass requests through - AppEngineClient will handle them
  async generateSpeech(data: any) {
    return this.request('POST', 'ai/agent/chat', data);
  },

  async chat(data: any) {
    return this.request('POST', 'ai/chat', data);
  },

  async streamChat(data: any) {
    return this.request('POST', 'ai/agent/stream', data);
  },

  async getMcpTools() {
    return this.request('GET', 'ai/mcp/tools');
  },

  async executeMcpTool(toolName: string, args: any) {
    return this.request('POST', 'ai/mcp/execute', { toolName, args });
  }
};

export default apiClient;