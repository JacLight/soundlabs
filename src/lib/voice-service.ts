import { appmintEndpoints } from './appengine/appmint-endpoints';
import { getAppEngineClient } from './appengine/appmint-client';

// Demo/mock data for development
const DEMO_VOICES = [
  // OpenAI Voices
  { 
    id: 'alloy', 
    name: 'Alloy', 
    description: 'Neutral and balanced',
    avatar: '🎭',
    category: 'openai',
    provider: 'openai',
    accent: 'American',
    age: 'Young Adult',
    gender: 'Neutral',
    useCase: 'Narration, News'
  },
  { 
    id: 'echo', 
    name: 'Echo', 
    description: 'Warm and conversational',
    avatar: '🎤',
    category: 'openai',
    provider: 'openai',
    accent: 'American',
    age: 'Middle Aged',
    gender: 'Male',
    useCase: 'Podcasts, Conversations'
  },
  { 
    id: 'fable', 
    name: 'Fable', 
    description: 'Expressive British accent',
    avatar: '🎭',
    category: 'openai',
    provider: 'openai',
    accent: 'British',
    age: 'Young Adult',
    gender: 'Male',
    useCase: 'Storytelling, Audiobooks'
  },
  { 
    id: 'onyx', 
    name: 'Onyx', 
    description: 'Deep and authoritative',
    avatar: '🗿',
    category: 'openai',
    provider: 'openai',
    accent: 'American',
    age: 'Middle Aged',
    gender: 'Male',
    useCase: 'Documentaries, Corporate'
  },
  { 
    id: 'nova', 
    name: 'Nova', 
    description: 'Energetic and friendly',
    avatar: '✨',
    category: 'openai',
    provider: 'openai',
    accent: 'American',
    age: 'Young Adult',
    gender: 'Female',
    useCase: 'Marketing, Social Media'
  },
  { 
    id: 'shimmer', 
    name: 'Shimmer', 
    description: 'Soft and gentle',
    avatar: '🌟',
    category: 'openai',
    provider: 'openai',
    accent: 'American',
    age: 'Young Adult',
    gender: 'Female',
    useCase: 'Meditation, ASMR'
  },
  // ElevenLabs-style Voices (simulated)
  { 
    id: 'rachel', 
    name: 'Rachel', 
    description: 'Clear and articulate American voice',
    avatar: '👩',
    category: 'professional',
    provider: 'elevenlabs',
    accent: 'American',
    age: 'Young Adult',
    gender: 'Female',
    useCase: 'E-learning, Presentations'
  },
  { 
    id: 'adam', 
    name: 'Adam', 
    description: 'Deep, narrative voice',
    avatar: '👨',
    category: 'professional',
    provider: 'elevenlabs',
    accent: 'American',
    age: 'Middle Aged',
    gender: 'Male',
    useCase: 'Audiobooks, Narration'
  },
  { 
    id: 'bella', 
    name: 'Bella', 
    description: 'Warm, friendly female voice',
    avatar: '👩‍🦰',
    category: 'professional',
    provider: 'elevenlabs',
    accent: 'American',
    age: 'Young Adult',
    gender: 'Female',
    useCase: 'Customer Service, IVR'
  },
  { 
    id: 'josh', 
    name: 'Josh', 
    description: 'Young, energetic male voice',
    avatar: '👦',
    category: 'professional',
    provider: 'elevenlabs',
    accent: 'American',
    age: 'Young Adult',
    gender: 'Male',
    useCase: 'Gaming, YouTube'
  },
];

const DEMO_HISTORY = [
  {
    id: 'hist_1',
    text: 'Welcome to our platform. This is a sample text-to-speech generation.',
    voiceId: 'alloy',
    voiceName: 'Alloy',
    duration: '0:05',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
    audioUrl: '/demo/audio1.mp3',
    settings: { stability: 0.5, similarity: 0.75 }
  },
  {
    id: 'hist_2',
    text: 'The quick brown fox jumps over the lazy dog.',
    voiceId: 'nova',
    voiceName: 'Nova',
    duration: '0:03',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    audioUrl: '/demo/audio2.mp3',
    settings: { stability: 0.7, similarity: 0.8 }
  },
  {
    id: 'hist_3',
    text: 'Artificial intelligence is transforming the way we interact with technology.',
    voiceId: 'onyx',
    voiceName: 'Onyx',
    duration: '0:04',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    audioUrl: '/demo/audio3.mp3',
    settings: { stability: 0.6, similarity: 0.7 }
  },
];

const SAMPLE_TEXTS = [
  {
    id: 'sample_1',
    title: 'Welcome Message',
    text: 'Welcome to our text-to-speech platform. Experience natural-sounding voices powered by advanced AI technology.',
    category: 'intro',
    icon: '👋'
  },
  {
    id: 'sample_2',
    title: 'Product Demo',
    text: 'Transform your text into lifelike speech with our cutting-edge AI voices. Perfect for content creators, educators, and businesses.',
    category: 'business',
    icon: '💼'
  },
  {
    id: 'sample_3',
    title: 'Story Opening',
    text: 'Once upon a time, in a land far away, there lived a wise old wizard who possessed the secret to eternal happiness.',
    category: 'narrative',
    icon: '📚'
  },
  {
    id: 'sample_4',
    title: 'News Report',
    text: 'Breaking news: Scientists have discovered a revolutionary new method for converting text to speech that sounds indistinguishable from human voices.',
    category: 'news',
    icon: '📰'
  },
  {
    id: 'sample_5',
    title: 'Meditation Guide',
    text: 'Take a deep breath. Feel your body relax as you exhale slowly. Let go of any tension you may be holding.',
    category: 'wellness',
    icon: '🧘'
  },
];

export interface Voice {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: string;
  provider: string;
  accent?: string;
  age?: string;
  gender?: string;
  useCase?: string;
}

export interface VoiceSettings {
  stability: number;
  similarity: number;
  style?: number;
  speakerBoost?: boolean;
  // Advanced settings for dubbing
  language?: string;
  accent?: number;
  emotionalRange?: number;
  intonation?: number;
  impressions?: number;
  tone?: number;
  whispering?: number;
}

export interface GenerateSpeechOptions {
  text: string;
  voiceId: string;
  settings?: VoiceSettings;
  model?: string;
}

export interface HistoryItem {
  id: string;
  text: string;
  voiceId: string;
  voiceName: string;
  duration: string;
  createdAt: string;
  audioUrl: string;
  settings: VoiceSettings;
}

export interface SampleText {
  id: string;
  title: string;
  text: string;
  category: string;
  icon: string;
}

class VoiceService {
  private useDemoData = false; // Using real API now!

  // Get all available voices
  async getVoices(): Promise<Voice[]> {
    // For now just return demo data since voices aren't stored in Appengine
    // When you add a voices endpoint to Appengine, we'll call it through the catch-all route
    return Promise.resolve(DEMO_VOICES);
  }

  // Get voices by category
  async getVoicesByCategory(category: string): Promise<Voice[]> {
    const voices = await this.getVoices();
    return voices.filter(v => v.category === category);
  }

  // Get voice by ID
  async getVoiceById(voiceId: string): Promise<Voice | undefined> {
    const voices = await this.getVoices();
    return voices.find(v => v.id === voiceId);
  }

  // Search voices
  async searchVoices(query: string): Promise<Voice[]> {
    const voices = await this.getVoices();
    const lowercaseQuery = query.toLowerCase();
    return voices.filter(v => 
      v.name.toLowerCase().includes(lowercaseQuery) ||
      v.description.toLowerCase().includes(lowercaseQuery) ||
      v.accent?.toLowerCase().includes(lowercaseQuery) ||
      v.useCase?.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Generate speech
  async generateSpeech(options: GenerateSpeechOptions): Promise<any> {
    if (this.useDemoData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        audioUrl: `/demo/generated_${Date.now()}.mp3`,
        duration: '0:' + Math.floor(options.text.length / 10).toString().padStart(2, '0'),
        message: 'Demo: Speech generated successfully',
        credits_used: Math.ceil(options.text.length / 100)
      };
    }

    try {
      // Use AppEngineClient directly
      const appEngineClient = getAppEngineClient();
      const endpoint = `${appmintEndpoints.upstream_call.path}/OpenAIProvider/textToSpeech`;
      // Build the request data with all settings
      const requestData: any = {
        input: options.text,
        voice: options.voiceId || 'alloy',
        format: 'mp3', // Using format instead of response_format
        model: options.model || 'tts-1',
      };

      // Add all the advanced settings if provided
      if (options.settings) {
        // Basic settings
        if (options.settings.stability !== undefined) {
          requestData.stability = options.settings.stability;
        }
        if (options.settings.similarity !== undefined) {
          requestData.similarity_boost = options.settings.similarity;
        }
        if (options.settings.style !== undefined) {
          requestData.style = options.settings.style;
        }
        if (options.settings.speakerBoost !== undefined) {
          requestData.use_speaker_boost = options.settings.speakerBoost;
        }
        
        // Advanced dubbing settings
        if (options.settings.language) {
          requestData.language = options.settings.language;
        }
        if (options.settings.accent !== undefined) {
          requestData.accent_strength = options.settings.accent;
        }
        if (options.settings.emotionalRange !== undefined) {
          requestData.emotional_range = options.settings.emotionalRange;
        }
        if (options.settings.intonation !== undefined) {
          requestData.intonation = options.settings.intonation;
        }
        if (options.settings.impressions !== undefined) {
          requestData.impressions = options.settings.impressions;
        }
        if (options.settings.tone !== undefined) {
          requestData.tone = options.settings.tone;
        }
        if (options.settings.whispering !== undefined) {
          requestData.whispering = options.settings.whispering;
        }
      }

      console.log('Sending TTS request with data:', requestData);

      const response = await appEngineClient.processRequest(
        'POST',
        endpoint,
        {
          configId: 'default',
          data: requestData
        }
      );
      
      // Convert audio buffer to playable URL
      if (response.success && response.audioBuffer) {
        const audioBlob = new Blob([new Uint8Array(response.audioBuffer.data)], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        return {
          success: true,
          audioUrl: audioUrl,
          format: response.format,
          model: response.model,
          voice: response.voice,
          message: 'Speech generated successfully'
        };
      }
      
      return response;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  // Get generation history
  async getHistory(limit: number = 10): Promise<HistoryItem[]> {
    // For now, just return demo history since this would need a custom endpoint in Appengine
    return Promise.resolve(DEMO_HISTORY.slice(0, limit));
  }

  // Delete history item
  async deleteHistoryItem(id: string): Promise<boolean> {
    if (this.useDemoData) {
      const index = DEMO_HISTORY.findIndex(item => item.id === id);
      if (index > -1) {
        DEMO_HISTORY.splice(index, 1);
        return true;
      }
      return false;
    }
    
    // Would need to implement in Appengine
    return false;
  }

  // Get sample texts
  getSampleTexts(): SampleText[] {
    return SAMPLE_TEXTS;
  }

  // Get sample text by category
  getSampleTextsByCategory(category: string): SampleText[] {
    return SAMPLE_TEXTS.filter(t => t.category === category);
  }

  // Clone voice (future feature)
  async cloneVoice(audioFile: File, name: string, description?: string): Promise<any> {
    // For demo/development only
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      voiceId: `custom_${Date.now()}`,
      message: 'Demo: Voice cloned successfully'
    };
    
    // Would need to implement voice cloning endpoint in Appengine
  }

  // Get voice settings recommendations
  getDefaultSettings(voiceId: string): VoiceSettings {
    // Different voices might have different optimal settings
    const voiceDefaults: Record<string, VoiceSettings> = {
      'alloy': { stability: 0.5, similarity: 0.75, speakerBoost: true },
      'echo': { stability: 0.6, similarity: 0.8, speakerBoost: false },
      'fable': { stability: 0.4, similarity: 0.7, speakerBoost: true },
      'onyx': { stability: 0.7, similarity: 0.85, speakerBoost: true },
      'nova': { stability: 0.45, similarity: 0.75, speakerBoost: false },
      'shimmer': { stability: 0.55, similarity: 0.8, speakerBoost: false },
    };

    return voiceDefaults[voiceId] || { 
      stability: 0.5, 
      similarity: 0.75, 
      speakerBoost: true 
    };
  }

  // Estimate credits/cost
  estimateCredits(text: string): number {
    // Rough estimate: 1 credit per 100 characters
    return Math.ceil(text.length / 100);
  }

  // Validate text length
  validateTextLength(text: string, maxLength: number = 5000): boolean {
    return text.length > 0 && text.length <= maxLength;
  }
}

// Export singleton instance
export const voiceService = new VoiceService();

// Export demo data for direct access if needed
export const demoData = {
  voices: DEMO_VOICES,
  history: DEMO_HISTORY,
  sampleTexts: SAMPLE_TEXTS
};