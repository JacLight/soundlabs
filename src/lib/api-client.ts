import axios from 'axios';

const API_BASE = '/api';

export const apiClient = {
  // For now, return hardcoded voices since Appengine doesn't have a dedicated voices endpoint
  // In production, these would come from the AI provider (OpenAI, ElevenLabs, etc.)
  async getVoices() {
    return {
      voices: [
        { id: 'alloy', name: 'Alloy', description: 'Neutral and balanced voice', provider: 'openai' },
        { id: 'echo', name: 'Echo', description: 'Warm and conversational voice', provider: 'openai' },
        { id: 'fable', name: 'Fable', description: 'Expressive British accent', provider: 'openai' },
        { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative voice', provider: 'openai' },
        { id: 'nova', name: 'Nova', description: 'Energetic and friendly voice', provider: 'openai' },
        { id: 'shimmer', name: 'Shimmer', description: 'Soft and gentle voice', provider: 'openai' },
      ]
    };
  },

  // Generate speech using Appengine's AI chat endpoint
  async generateSpeech(text: string, voiceId: string = 'alloy') {
    try {
      const response = await axios.post(`${API_BASE}/ai/chat`, {
        task: `Generate TTS audio for the following text using voice ${voiceId}: "${text}"`,
        context: {
          action: 'tts',
          voice: voiceId,
          text: text,
          provider: 'openai' // or 'elevenlabs', 'google', etc.
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }
};

export default apiClient;