"use client";

import { useState } from 'react';
import AudioPlayer from '@/components/audio-player';
import { voiceService } from '@/lib/voice-service';

export default function TestTTSPage() {
  const [text, setText] = useState('Hello! This is a test of the text-to-speech system using OpenAI voices through Appengine.');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const voices = [
    { id: 'alloy', name: 'Alloy' },
    { id: 'echo', name: 'Echo' },
    { id: 'fable', name: 'Fable' },
    { id: 'onyx', name: 'Onyx' },
    { id: 'nova', name: 'Nova' },
    { id: 'shimmer', name: 'Shimmer' },
  ];

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await voiceService.generateSpeech({
        text: text,
        voiceId: selectedVoice,
        model: 'tts-1'
      });

      if (response.success && response.audioUrl) {
        setAudioUrl(response.audioUrl);
      } else {
        setError('Failed to generate speech');
      }
    } catch (err) {
      console.error('Error generating speech:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Test TTS Integration</h1>
        <p className="text-sm text-gray-600 mt-1">Testing OpenAI TTS through Appengine</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Input Section */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Text Input</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech..."
              className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <div className="mt-2 text-sm text-gray-500">
              {text.length} characters
            </div>
          </div>

          {/* Voice Selection */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Voice Selection</h2>
            <div className="grid grid-cols-3 gap-3">
              {voices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedVoice === voice.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {voice.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerateSpeech}
              disabled={isGenerating || !text.trim()}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isGenerating || !text.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Speech'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Audio Player */}
          {audioUrl && (
            <AudioPlayer
              audioUrl={audioUrl}
              title={text.substring(0, 50) + (text.length > 50 ? '...' : '')}
              voice={voices.find(v => v.id === selectedVoice)?.name || 'Unknown'}
            />
          )}
        </div>
      </div>
    </div>
  );
}