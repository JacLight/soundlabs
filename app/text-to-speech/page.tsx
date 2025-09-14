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
import apiClient from "@/lib/api-client";

interface Voice {
  id: string;
  name: string;
  description: string;
  avatar: string;
  bgColor: string;
  category: "recently" | "default" | "professional" | "library";
}

const voices: Voice[] = [
  {
    id: "liam-1",
    name: "Liam",
    description: "A young adult with energy and warmth",
    avatar: "👨",
    bgColor: "bg-green-100",
    category: "recently"
  },
  {
    id: "marlena",
    name: "Marlena",
    description: "Pleasant, expressive yet calm feminine voice",
    avatar: "👩",
    bgColor: "bg-pink-100",
    category: "recently"
  },
  {
    id: "lina",
    name: "LINA PROFESSIONAL",
    description: "Warm, expressive Latina voice with authentic accent",
    avatar: "💫",
    bgColor: "bg-blue-100",
    category: "recently"
  },
  {
    id: "cassidy",
    name: "Cassidy",
    description: "A confident female podcaster with authoritative tone",
    avatar: "🎙️",
    bgColor: "bg-purple-100",
    category: "recently"
  },
  {
    id: "brian",
    name: "Brian",
    description: "Middle-aged man with a resonant and engaging voice",
    avatar: "🧔",
    bgColor: "bg-amber-100",
    category: "recently"
  },
  {
    id: "liam-2",
    name: "Liam",
    description: "A young adult with energy and warmth",
    avatar: "👨",
    bgColor: "bg-green-100",
    category: "default"
  },
  {
    id: "brian-2",
    name: "Brian",
    description: "Middle-aged man with a resonant and engaging voice",
    avatar: "🧔",
    bgColor: "bg-amber-100",
    category: "default"
  },
  {
    id: "alice",
    name: "Alice",
    description: "Clear and engaging, friendly woman with a natural tone",
    avatar: "👩‍💼",
    bgColor: "bg-cyan-100",
    category: "default"
  },
  {
    id: "bill",
    name: "Bill",
    description: "Friendly and comforting voice ready to narrate",
    avatar: "👨‍💼",
    bgColor: "bg-indigo-100",
    category: "default"
  },
  {
    id: "callum",
    name: "Callum",
    description: "Deceptively gravelly, yet unsettling edge",
    avatar: "🎭",
    bgColor: "bg-red-100",
    category: "default"
  },
];

const historyItems = [
  {
    id: 1,
    text: "Imagine building an app... not with code, not with clicks... but with conversation.",
    voice: "Liam",
    timestamp: "5 days ago",
    duration: "0:27",
  },
  {
    id: 2,
    text: "Imagine building an app... not with code, not with clicks... but with conversation.",
    voice: "Brian",
    timestamp: "5 days ago",
    duration: "0:25",
  },
  {
    id: 3,
    text: "[Opening Scene] Dark screen. A spark of code fades into glow...",
    voice: "Brian",
    timestamp: "5 days ago",
    duration: "0:45",
  },
  {
    id: 4,
    text: "Prompt your idea into reality with — Appmint. One line, one platform, endless possibilities.",
    voice: "Jessica Anne Bogart",
    timestamp: "last week",
    duration: "0:18",
  },
  {
    id: 5,
    text: "Stop wasting months and thousands just to test an idea. With Appmint, you describe it, and it's live.",
    voice: "Jessica Anne Bogart",
    timestamp: "last week",
    duration: "0:22",
  },
  {
    id: 6,
    text: "Get your mobile app live in hours, not months. With Appmint, you describe, we build.",
    voice: "Jessa",
    timestamp: "last week",
    duration: "0:19",
  },
  {
    id: 7,
    text: "You think AI is just chat? Meanwhile, 16-year-olds are building apps with one sentence.",
    voice: "Brian",
    timestamp: "2 weeks ago",
    duration: "0:15",
  },
];

const sampleTexts = [
  {
    id: 1,
    title: "Option 1 — Direct Confrontation",
    text: `"Your IT provider says they've embraced AI.
So why are your costs the same?
If engineers are gone, and agents are doing the work...
where are your savings?"`,
    icon: "🔥",
  },
  {
    id: 2,
    title: "Option 2 — Exposing the Scam",
    text: `"Here's the dirty secret of IT right now.
AI slashed costs by eighty percent.
But your provider didn't cut your bill.
They cut their costs and kept the margin."`,
    icon: "⚡",
  },
  {
    id: 3,
    title: "Option 3 — The Customer Challenge",
    text: `"AI has wiped out entire teams of engineers.
That means your IT costs should be eighty percent lower.
If they're not — your provider is keeping what should be yours."

Right now, companies everywhere are cutting staff.
Not because of recession.
Not because of lack of work.
But because agents are doing what entire engineering teams used to do.

Eighty percent of IT service costs used to be engineers.
Today? Agents are doing that work — faster, cheaper, better.

But here's the problem.
Your provider hasn't passed the savings to you.
They cut their costs.
They didn't cut your bill.
They kept the margin.
And if they're charging you the same price... they're scamming you.

The truth is simple.
Your IT costs should drop by eighty percent.
That's the real math.

And if your agent isn't giving you those savings, we will.
We're here to deliver ninety percent cost reduction.
With a free trial.
No gimmicks. No excuses. Just the future of IT — at the price it should be.

Stop paying for empty seats.
Stop funding their margins.`,
    icon: "🚀",
  },
];

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<Voice>(voices[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"settings" | "history">("settings");
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [playingHistoryId, setPlayingHistoryId] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [styleExaggeration, setStyleExaggeration] = useState(0);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const characterCount = text.length;
  const maxCharacters = 5000;
  const credits = 81831;

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

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
      alert("Please enter some text to generate speech");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiClient.generateSpeech({
        text: text,
        voice: selectedVoice.id,
        model: "eleven_multilingual_v2",
        settings: {
          stability: stability,
          similarity: similarity,
          style: styleExaggeration,
          speakerBoost: speakerBoost,
        }
      });

      if (response.audioUrl) {
        setGeneratedAudioUrl(response.audioUrl);
        // Auto-play the generated audio
        if (audioRef.current) {
          audioRef.current.src = response.audioUrl;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error generating speech:", error);
      alert("Failed to generate speech. Please try again.");
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

  const handlePlayHistory = (id: number) => {
    setPlayingHistoryId(playingHistoryId === id ? null : id);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSendToEditor = (text: string) => {
    setText(text);
    setActiveTab("settings");
  };

  const filteredVoices = voices.filter(voice =>
    voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentlyUsedVoices = filteredVoices.filter(v => v.category === "recently");
  const defaultVoices = filteredVoices.filter(v => v.category === "default");

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
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 ${selectedVoice.bgColor} rounded-full flex items-center justify-center`}>
                      <span className="text-xs">{selectedVoice.avatar}</span>
                    </div>
                    <span className="text-sm">{selectedVoice.name}</span>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </button>
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
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-gray-900 line-clamp-2 flex-1">{item.text}</p>
                      <button
                        onClick={() => handlePlayHistory(item.id)}
                        className="ml-2 w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0"
                      >
                        {playingHistoryId === item.id ? (
                          <PauseIcon className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <PlayIcon className="w-3.5 h-3.5 text-white ml-0.5" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <CheckCircleIcon className="w-3 h-3 text-green-500" />
                        <span>{item.voice}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleCopyText(item.text)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <ClipboardDocumentIcon className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                          <ArrowDownTrayIcon className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleSendToEditor(item.text)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <ArrowPathIcon className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                          <EllipsisHorizontalIcon className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Date Separators */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">September 7, 2025</p>
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

        {/* Audio Player */}
        <div className="bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Stop wasting months and thousands just to test...
            </span>
            <div className="flex-1 flex items-center space-x-3">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Jessica Anne Bogart - A VO Professional; now cloned!</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <SpeakerWaveIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handlePlayPause}
                disabled={!generatedAudioUrl}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  generatedAudioUrl 
                    ? "bg-black hover:bg-gray-800" 
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5 text-white" />
                ) : (
                  <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowPathIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>0:16</span>
              <div className="w-48 h-1 bg-gray-200 rounded-full">
                <div className="w-1/3 h-full bg-black rounded-full"></div>
              </div>
              <span>0:27</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Share</button>
            </div>
          </div>
        </div>
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
            {/* Recently Used */}
            {recentlyUsedVoices.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Recently used</h3>
                  <button className="text-xs text-gray-500 hover:text-gray-700">View all</button>
                </div>
                <div className="space-y-2">
                  {recentlyUsedVoices.map((voice) => (
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

            {/* Default Voices */}
            {defaultVoices.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Default</h3>
                  <button className="text-xs text-gray-500 hover:text-gray-700">View all</button>
                </div>
                <div className="space-y-2">
                  {defaultVoices.map((voice) => (
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
          </div>
        </div>
      )}
    </div>
  );
}