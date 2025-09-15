"use client";

import { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  SpeakerWaveIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { voiceService, type Voice } from "@/lib/voice-service";
import AudioPlayer from "@/components/audio-player";

interface VoiceDisplay extends Voice {
  bgColor: string;
}

// Color mapping for voices
const voiceColors: Record<string, string> = {
  'alloy': 'bg-green-100',
  'echo': 'bg-amber-100',
  'fable': 'bg-blue-100',
  'onyx': 'bg-purple-100',
  'nova': 'bg-pink-100',
  'shimmer': 'bg-cyan-100',
  'rachel': 'bg-indigo-100',
  'adam': 'bg-red-100',
  'bella': 'bg-yellow-100',
  'josh': 'bg-emerald-100'
};

// Supported languages
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'hy', name: 'Armenian', flag: '🇦🇲' },
  { code: 'az', name: 'Azerbaijani', flag: '🇦🇿' },
  { code: 'be', name: 'Belarusian', flag: '🇧🇾' },
  { code: 'bs', name: 'Bosnian', flag: '🇧🇦' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'ca', name: 'Catalan', flag: '🇪🇸' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'et', name: 'Estonian', flag: '🇪🇪' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'gl', name: 'Galician', flag: '🇪🇸' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'is', name: 'Icelandic', flag: '🇮🇸' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'kk', name: 'Kazakh', flag: '🇰🇿' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹' },
  { code: 'mk', name: 'Macedonian', flag: '🇲🇰' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'mi', name: 'Maori', flag: '🇳🇿' },
  { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'sr', name: 'Serbian', flag: '🇷🇸' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'cy', name: 'Welsh', flag: '🏴󐁧󐁢󐁷󐁬󐁳󐁿' },
].sort((a, b) => a.name.localeCompare(b.name));

const sampleTexts = [
  {
    id: 1,
    title: "Welcome Message",
    text: `Welcome to our text-to-speech platform. Experience natural-sounding voices powered by advanced AI technology.`,
    icon: "👋",
  },
  {
    id: 2,
    title: "Product Demo",
    text: `Transform your text into lifelike speech with our cutting-edge AI voices. Perfect for content creators, educators, and businesses.`,
    icon: "💼",
  },
  {
    id: 3,
    title: "Story Opening",
    text: `Once upon a time, in a land far away, there lived a wise old wizard who possessed the secret to eternal happiness.`,
    icon: "📚",
  },
];

// History item interface
interface HistoryItem {
  id: string;
  text: string;
  voiceId: string;
  voiceName: string;
  language: string;
  timestamp: Date;
  duration: string;
  audioUrl: string | null;
  settings: any;
  isExpanded?: boolean;
}

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<VoiceDisplay[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceDisplay | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingVoices, setLoadingVoices] = useState(true);
  const [activeTab, setActiveTab] = useState<"settings" | "history">("settings");
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [playingHistoryId, setPlayingHistoryId] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [styleExaggeration, setStyleExaggeration] = useState(0);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  
  // New advanced controls
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [accent, setAccent] = useState(0.5);
  const [emotionalRange, setEmotionalRange] = useState(0.5);
  const [intonation, setIntonation] = useState(0.5);
  const [impressions, setImpressions] = useState(0);
  const [tone, setTone] = useState(0.5);
  const [whispering, setWhispering] = useState(0);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const characterCount = text.length;
  const maxCharacters = 5000;
  const credits = 81831;

  // Fetch voices on mount
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        setLoadingVoices(true);
        const fetchedVoices = await voiceService.getVoices();
        
        // Map voices to include bgColor
        const displayVoices: VoiceDisplay[] = fetchedVoices.map(voice => ({
          ...voice,
          bgColor: voiceColors[voice.id] || 'bg-gray-100'
        }));
        
        setVoices(displayVoices);
        
        // Set default voice
        if (displayVoices.length > 0) {
          setSelectedVoice(displayVoices[0]);
        }
      } catch (err) {
        console.error('Error fetching voices:', err);
        setError('Failed to load voices');
      } finally {
        setLoadingVoices(false);
      }
    };

    fetchVoices();
  }, []);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      setPlayingHistoryId(null);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setPlayingHistoryId(null);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      setError("Please enter some text to generate speech");
      return;
    }

    if (!selectedVoice) {
      setError("Please select a voice");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const response = await voiceService.generateSpeech({
        text: text,
        voiceId: selectedVoice.id,
        model: "tts-1",
        settings: {
          stability: stability,
          similarity: similarity,
          style: styleExaggeration,
          speakerBoost: speakerBoost,
          // Advanced settings
          language: selectedLanguage,
          accent: accent,
          emotionalRange: emotionalRange,
          intonation: intonation,
          impressions: impressions,
          tone: tone,
          whispering: whispering,
        }
      });

      if (response.success && response.audioUrl) {
        setGeneratedAudioUrl(response.audioUrl);
        
        // Add to history
        const historyItem: HistoryItem = {
          id: `hist_${Date.now()}`,
          text: text,
          voiceId: selectedVoice.id,
          voiceName: selectedVoice.name,
          language: selectedLanguage,
          timestamp: new Date(),
          duration: '0:' + Math.floor(text.length / 150).toString().padStart(2, '0'), // Estimate
          audioUrl: response.audioUrl,
          settings: {
            stability,
            similarity,
            style: styleExaggeration,
            speakerBoost,
            accent,
            emotionalRange,
            intonation,
            impressions,
            tone,
            whispering
          }
        };
        setHistory(prev => [historyItem, ...prev]);
        
        // Auto-play the generated audio
        if (audioRef.current) {
          audioRef.current.src = response.audioUrl;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error("Error generating speech:", err);
      setError(err instanceof Error ? err.message : "Failed to generate speech. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSelectSample = (sample: typeof sampleTexts[0]) => {
    setText(sample.text);
  };

  const handlePlayHistory = (item: HistoryItem) => {
    if (!item.audioUrl) return;
    
    // If this item is already playing, pause it
    if (playingHistoryId === item.id && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setPlayingHistoryId(null);
      }
    } else {
      // Play this item
      setGeneratedAudioUrl(item.audioUrl);
      if (audioRef.current) {
        audioRef.current.src = item.audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
        setPlayingHistoryId(item.id);
      }
    }
  };

  const handleDownloadAudio = (item: HistoryItem) => {
    if (item.audioUrl) {
      const a = document.createElement('a');
      a.href = item.audioUrl;
      a.download = `speech_${item.voiceName}_${item.id}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const toggleExpandHistory = (id: string) => {
    setExpandedHistoryId(expandedHistoryId === id ? null : id);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSendToEditor = (historyText: string) => {
    setText(historyText);
    setActiveTab("settings");
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const filteredVoices = voices.filter(voice =>
    voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group voices by provider
  const openAIVoices = filteredVoices.filter(v => v.provider === 'openai');
  const elevenLabsVoices = filteredVoices.filter(v => v.provider === 'elevenlabs');

  return (
    <div className="flex h-full bg-[#fafafa]">
      <audio ref={audioRef} />
      
      {/* Left Sidebar */}
      <div className="w-[400px] bg-white border-r border-gray-100 flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === "settings"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === "history"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "settings" ? (
            <div className="p-4 space-y-6">
              {/* Voice Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Voice</label>
                <button
                  onClick={() => setShowVoicePanel(!showVoicePanel)}
                  disabled={loadingVoices}
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingVoices ? (
                    <span className="text-sm text-gray-500">Loading voices...</span>
                  ) : selectedVoice ? (
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 ${selectedVoice.bgColor} rounded-full flex items-center justify-center`}>
                        <span className="text-xs">{selectedVoice.avatar}</span>
                      </div>
                      <span className="text-sm">{selectedVoice.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Select a voice</span>
                  )}
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Language Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
                <div className="relative">
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none"
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                  <ChevronRightIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Model Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Model</label>
                <div className="relative">
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none">
                    <option>Eleven Multilingual v2</option>
                    <option>Eleven Turbo v2.5</option>
                    <option>Eleven English v1</option>
                  </select>
                  <ChevronRightIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">The most expressive Text to Speech</span>
                  <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full font-medium">
                    Try v3 (alpha)
                  </button>
                </div>
              </div>

              {/* Speed */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Speed</label>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Slower</span>
                    <span>Faster</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Stability */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Stability</label>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>More variable</span>
                    <span>More stable</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={stability}
                  onChange={(e) => setStability(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Similarity */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Similarity</label>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={similarity}
                  onChange={(e) => setSimilarity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Style Exaggeration */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Style Exaggeration</label>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>None</span>
                    <span>Exaggerated</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={styleExaggeration}
                  onChange={(e) => setStyleExaggeration(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Speaker Boost */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Speaker boost</label>
                <button
                  onClick={() => setSpeakerBoost(!speakerBoost)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    speakerBoost ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      speakerBoost ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Advanced Settings Toggle */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <span>Advanced Voice Controls</span>
                  <ChevronRightIcon className={`w-4 h-4 transition-transform ${showAdvancedSettings ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Advanced Settings */}
              {showAdvancedSettings && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  {/* Accent */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Accent</label>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Neutral</span>
                        <span>Strong</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={accent}
                      onChange={(e) => setAccent(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Emotional Range */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Emotional Range</label>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Flat</span>
                        <span>Expressive</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={emotionalRange}
                      onChange={(e) => setEmotionalRange(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Intonation */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Intonation</label>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Monotone</span>
                        <span>Dynamic</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={intonation}
                      onChange={(e) => setIntonation(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Impressions */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Impressions</label>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>None</span>
                        <span>Character</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={impressions}
                      onChange={(e) => setImpressions(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Tone */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Tone</label>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Serious</span>
                        <span>Playful</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={tone}
                      onChange={(e) => setTone(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Whispering */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Whispering</label>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Normal</span>
                        <span>Whisper</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={whispering}
                      onChange={(e) => setWhispering(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              <button className="text-sm text-gray-500 hover:text-gray-700">
                Reset values
              </button>
            </div>
          ) : (
            <div className="p-4">
              {/* Search */}
              <div className="relative mb-4">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search history..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* History Items */}
              <div className="space-y-3">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <SpeakerWaveIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">No history yet</p>
                    <p className="text-xs mt-1">Generate some speech to see it here</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-gray-900">{item.voiceName}</span>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                                {SUPPORTED_LANGUAGES.find(l => l.code === item.language)?.flag} {item.language.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-500">{item.duration}</span>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {item.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatTimestamp(item.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handlePlayHistory(item)}
                              className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                              title="Play"
                            >
                              {playingHistoryId === item.id ? (
                                <PauseIcon className="w-4 h-4 text-white" />
                              ) : (
                                <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDownloadAudio(item)}
                              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              title="Download"
                            >
                              <ArrowDownTrayIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => toggleExpandHistory(item.id)}
                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                          >
                            <ChevronRightIcon className={`w-3 h-3 transition-transform ${expandedHistoryId === item.id ? 'rotate-90' : ''}`} />
                            <span>{expandedHistoryId === item.id ? 'Hide' : 'Show'} full transcript</span>
                          </button>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleCopyText(item.text)}
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title="Copy text"
                            >
                              <ClipboardDocumentIcon className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              onClick={() => handleSendToEditor(item.text)}
                              className="px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition-colors"
                            >
                              Use this text
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedHistoryId === item.id && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="mt-4">
                            <h4 className="text-xs font-medium text-gray-700 mb-2">Full Transcript:</h4>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">{item.text}</p>
                            </div>
                            
                            <h4 className="text-xs font-medium text-gray-700 mt-4 mb-2">Settings Used:</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                              <div>Stability: {(item.settings.stability * 100).toFixed(0)}%</div>
                              <div>Similarity: {(item.settings.similarity * 100).toFixed(0)}%</div>
                              <div>Accent: {(item.settings.accent * 100).toFixed(0)}%</div>
                              <div>Emotional Range: {(item.settings.emotionalRange * 100).toFixed(0)}%</div>
                              <div>Tone: {(item.settings.tone * 100).toFixed(0)}%</div>
                              <div>Whispering: {(item.settings.whispering * 100).toFixed(0)}%</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Text to Speech</h1>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">Feedback</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Documentation</button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                🗨️ Talk to El
              </button>
            </div>
          </div>
        </div>

        {/* Sample Texts */}
        <div className="px-6 py-4 space-y-3">
          {sampleTexts.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{sample.icon}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">{sample.title}</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line line-clamp-3">{sample.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Text Input Area */}
        <div className="flex-1 px-6 pb-6">
          <div className="h-full bg-white rounded-lg border border-gray-200 p-4 flex flex-col">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
              className="flex-1 w-full resize-none focus:outline-none text-gray-900"
              maxLength={maxCharacters}
            />
            
            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {credits.toLocaleString()} credits remaining
                </span>
                <span className="text-sm text-gray-500">
                  {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()} characters
                </span>
              </div>
              <button 
                onClick={handleGenerateSpeech}
                disabled={isGenerating || !text.trim()}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium ${
                  isGenerating || !text.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isGenerating ? "Generating..." : "Generate speech"}
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Audio Player */}
        {generatedAudioUrl && (
          <div className="bg-white border-t border-gray-100 p-6">
            <AudioPlayer
              audioUrl={generatedAudioUrl}
              title={text.substring(0, 50) + (text.length > 50 ? '...' : '')}
              voice={selectedVoice?.name || 'Unknown'}
              onPlayStateChange={(playing) => setIsPlaying(playing)}
            />
          </div>
        )}
      </div>

      {/* Voice Selection Panel */}
      {showVoicePanel && (
        <div className="absolute top-0 right-0 w-96 h-full bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Select a voice</h2>
              <button
                onClick={() => setShowVoicePanel(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎙️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Explore Voice Library</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Find high quality voices from the community. Perfect for any occasion.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative mt-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search voices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingVoices ? (
              <div className="p-4 text-center text-gray-500">
                Loading voices...
              </div>
            ) : (
              <>
                {/* OpenAI Voices */}
                {openAIVoices.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700">OpenAI Voices</h3>
                      <button className="text-xs text-gray-500 hover:text-gray-700">View all</button>
                    </div>
                    <div className="space-y-2">
                      {openAIVoices.map((voice) => (
                        <button
                          key={voice.id}
                          onClick={() => {
                            setSelectedVoice(voice);
                            setShowVoicePanel(false);
                          }}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 ${voice.bgColor} rounded-full flex items-center justify-center`}>
                              <span className="text-sm">{voice.avatar}</span>
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">{voice.name}</p>
                              <p className="text-xs text-gray-500 truncate max-w-[200px]">{voice.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <PlayIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <EllipsisHorizontalIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ElevenLabs Voices */}
                {elevenLabsVoices.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700">Professional Voices</h3>
                      <button className="text-xs text-gray-500 hover:text-gray-700">View all</button>
                    </div>
                    <div className="space-y-2">
                      {elevenLabsVoices.map((voice) => (
                        <button
                          key={voice.id}
                          onClick={() => {
                            setSelectedVoice(voice);
                            setShowVoicePanel(false);
                          }}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 ${voice.bgColor} rounded-full flex items-center justify-center`}>
                              <span className="text-sm">{voice.avatar}</span>
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">{voice.name}</p>
                              <p className="text-xs text-gray-500 truncate max-w-[200px]">{voice.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <PlayIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <EllipsisHorizontalIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}