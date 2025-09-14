import axios from 'axios';

const API_BASE = '/api';

export const apiClient = {
  // Voice endpoints
  async getVoices() {
    const response = await axios.get(`${API_BASE}/voices`);
    return response.data;
  },

  async generateSpeech(data: {
    text: string;
    voice: string;
    model?: string;
    settings?: {
      stability?: number;
      similarity?: number;
      style?: number;
      speakerBoost?: boolean;
    };
  }) {
    const response = await axios.post(`${API_BASE}/text-to-speech`, data);
    return response.data;
  },

  async getVoiceSettings(voiceId: string) {
    const response = await axios.get(`${API_BASE}/voices/${voiceId}/settings`);
    return response.data;
  },

  // History endpoints
  async getHistory() {
    const response = await axios.get(`${API_BASE}/history`);
    return response.data;
  },

  async deleteHistoryItem(id: string) {
    const response = await axios.delete(`${API_BASE}/history/${id}`);
    return response.data;
  },

  // Audio playback helper
  async getAudioUrl(audioId: string): Promise<string> {
    return `${API_BASE}/audio/${audioId}`;
  },
};

export default apiClient;