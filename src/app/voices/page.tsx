"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlayIcon,
  PauseIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  ShareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const trendingVoices = [
  {
    id: 1,
    name: "David Boles",
    description: "Immersive & Educational",
    avatar: "👨‍💼",
    language: "English",
    accent: "+1",
    bgColor: "bg-cyan-100",
    samples: 2,
  },
  {
    id: 2,
    name: "Hope - Your conversational bestie",
    description: "Conversational",
    avatar: "💬",
    language: "English",
    accent: "+2",
    bgColor: "bg-yellow-100",
    samples: 3,
  },
  {
    id: 3,
    name: "Lily Wolff - Expressive, Clear, Youthful",
    description: "Narrative & Story",
    avatar: "👩",
    language: "English",
    accent: "+12",
    bgColor: "bg-pink-100",
    samples: 4,
  },
  {
    id: 4,
    name: "Adam - Authentic & Engaging Storyteller",
    description: "Documentary",
    avatar: "🎭",
    language: "English",
    accent: "+3",
    bgColor: "bg-green-100",
    samples: 2,
  },
  {
    id: 5,
    name: "Rissa - Romantic, Polished & Calm Voice",
    description: "Narrative & Story",
    avatar: "💕",
    language: "English",
    accent: "+8",
    bgColor: "bg-purple-100",
    samples: 3,
  },
  {
    id: 6,
    name: "Declan Sage - Wise, Deliberate, Captivating",
    description: "Narrative & Story",
    avatar: "🧙",
    language: "English",
    accent: "+6",
    bgColor: "bg-blue-100",
    samples: 2,
  },
];

const handpickedVoices = [
  {
    id: 1,
    title: "Best voices for Eleven v3",
    subtitle: "v3",
    bgColor: "bg-gradient-to-br from-purple-600 to-purple-800",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Burt Reynolds Hollywood Icon",
    image: "/reynolds.jpg",
    bgColor: "bg-gray-200",
    portrait: true,
  },
  {
    id: 3,
    title: "Studio-Quality Conversational Voices",
    bgColor: "bg-gradient-to-br from-indigo-600 to-purple-700",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Engaging Character Voices",
    bgColor: "bg-gradient-to-br from-teal-600 to-cyan-700",
    textColor: "text-white",
  },
];

const collections = [
  {
    id: 1,
    title: "Arabic",
    subtitle: "Top picks",
    bgColor: "bg-gradient-to-br from-purple-900 to-pink-800",
    textArabic: "أصوات",
  },
  {
    id: 2,
    title: "Bulgarian",
    subtitle: "Top picks",
    bgColor: "bg-gradient-to-br from-green-700 to-teal-600",
    textBulgarian: "гласове",
  },
  {
    id: 3,
    title: "Chinese",
    subtitle: "Top picks",
    bgColor: "bg-gradient-to-br from-blue-900 to-blue-700",
    textChinese: "声音",
  },
  {
    id: 4,
    title: "Czech",
    subtitle: "Top picks",
    bgColor: "bg-gradient-to-br from-amber-700 to-orange-600",
    textCzech: "hlasy",
  },
];

const weeklySpotlight = [
  {
    id: 1,
    name: "Aiden - Strange & sci-fi",
    description: "A strange and whimsical alien voice designed for sci-fi and fantasy content",
    avatar: "👽",
    language: "English",
    accent: "American",
    type: "Characters & Animation",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    name: "Declan - horror narrator",
    description: "A scary, ancient voice like it's speaking from a past time, perfect for horror narration",
    avatar: "👻",
    language: "English",
    accent: "Irish",
    type: "Characters & Animation",
    bgColor: "bg-purple-100",
  },
  {
    id: 3,
    name: "Matthew Schmitz - Reptilian Argonian Alien",
    description: "Deep, raiding voice with wet, hissing textures and guttural growls",
    avatar: "🦎",
    language: "English",
    accent: "Arabic",
    type: "Characters & Animation",
    bgColor: "bg-green-100",
  },
  {
    id: 4,
    name: "Rob - Tough & Colloused",
    description: "A tough British man. Gritty, Experienced, Strong",
    avatar: "💪",
    language: "English",
    accent: "British",
    type: "Characters & Animation",
    bgColor: "bg-orange-100",
  },
  {
    id: 5,
    name: "Bumble - Intense Woman",
    description: "Powerful British female voice with dramatic flair and intense emotional range",
    avatar: "🔥",
    language: "English",
    accent: "British",
    type: "Characters & Animation",
    bgColor: "bg-red-100",
  },
  {
    id: 6,
    name: "Creature - Goblin Mythical Monster",
    description: "A goblin creature with a high pitched voice. Great for fantasy and gaming",
    avatar: "👺",
    language: "English",
    accent: "American",
    type: "Characters & Animation",
    bgColor: "bg-yellow-100",
  },
];

const customerAgentVoices = [
  {
    id: 1,
    name: "Ms. Walker - Warm & Caring Southern Mom",
    description: "An comforting Southern mom who balances friendliness with efficient problem solving",
    avatar: "👩‍💼",
    language: "English",
    accent: "Mid-Southern",
    type: "Narrative & Story",
    bgColor: "bg-pink-100",
  },
  {
    id: 2,
    name: "Jason",
    description: "Young male voice. Good for conversation & sales",
    avatar: "👨",
    language: "English",
    accent: "American",
    type: "Conversational",
    bgColor: "bg-blue-100",
  },
];

export default function VoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [likedVoices, setLikedVoices] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("explore");

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  const toggleLike = (id: string) => {
    setLikedVoices(prev =>
      prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#fafafa] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Tabs */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveTab("explore")}
                className={`text-sm font-medium pb-2 border-b-2 transition-all ${
                  activeTab === "explore"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => setActiveTab("my-voices")}
                className={`text-sm font-medium pb-2 border-b-2 transition-all ${
                  activeTab === "my-voices"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                My Voices
              </button>
              <button
                onClick={() => setActiveTab("default")}
                className={`text-sm font-medium pb-2 border-b-2 transition-all ${
                  activeTab === "default"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Default Voices
              </button>
              <button
                onClick={() => setActiveTab("collections")}
                className={`text-sm font-medium pb-2 border-b-2 transition-all ${
                  activeTab === "collections"
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Collections
                <ChevronLeftIcon className="inline w-3 h-3 ml-1" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">30 slots used</span>
              <button className="text-sm text-gray-600 hover:text-gray-900">Feedback</button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-3 mt-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search library voices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <span>Trending</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <FunnelIcon className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Create or Clone a Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6">
        {/* Trending Voices */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trending voices</h2>
          <div className="grid grid-cols-3 gap-4">
            {trendingVoices.map((voice) => (
              <div
                key={voice.id}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${voice.bgColor} rounded-full flex items-center justify-center`}>
                      <span className="text-lg">{voice.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{voice.name}</h3>
                      <p className="text-xs text-gray-500">{voice.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleLike(`trending-${voice.id}`)}
                    className="p-1"
                  >
                    {likedVoices.includes(`trending-${voice.id}`) ? (
                      <HeartIconSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <GlobeAltIcon className="w-3 h-3 mr-1" />
                      {voice.language}
                    </span>
                    <span>{voice.accent}</span>
                  </div>
                  <button
                    onClick={() => togglePlay(`trending-${voice.id}`)}
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    {playingId === `trending-${voice.id}` ? (
                      <PauseIcon className="w-4 h-4 text-white" />
                    ) : (
                      <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handpicked for your use case */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Handpicked for your use case</h2>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {handpickedVoices.map((voice) => (
              <div
                key={voice.id}
                className={`relative h-40 rounded-xl overflow-hidden cursor-pointer group ${voice.bgColor}`}
              >
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h3 className={`text-sm font-semibold ${voice.textColor || "text-gray-900"}`}>
                    {voice.title}
                  </h3>
                  {voice.subtitle && (
                    <p className={`text-2xl font-bold mt-1 ${voice.textColor || "text-gray-700"}`}>
                      {voice.subtitle}
                    </p>
                  )}
                </div>
                <button className="absolute bottom-4 right-4 w-8 h-8 bg-black/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Spotlight - Character Voices */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Spotlight - Character Voices</h2>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <tbody>
                {weeklySpotlight.map((voice, index) => (
                  <tr key={voice.id} className={`hover:bg-gray-50 ${index !== weeklySpotlight.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${voice.bgColor} rounded-full flex items-center justify-center`}>
                          <span className="text-lg">{voice.avatar}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{voice.name}</h3>
                          <p className="text-xs text-gray-500 max-w-md truncate">{voice.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-4">
                        <div className="text-xs text-gray-500">
                          <span className="flex items-center">
                            <GlobeAltIcon className="w-3 h-3 mr-1" />
                            {voice.language}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{voice.accent}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {voice.type}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">2y</span>
                          <span className="text-xs text-gray-400">4.7k</span>
                          <button className="p-1">
                            <ShareIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </button>
                          <button className="p-1">
                            <EllipsisHorizontalIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Curated language collections */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Curated language collections</h2>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className={`relative h-40 rounded-xl overflow-hidden cursor-pointer group ${collection.bgColor}`}
              >
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white/90">{collection.title}</h3>
                    <p className="text-xs text-white/70">{collection.subtitle}</p>
                  </div>
                  <p className="text-3xl font-bold text-white/90">
                    {collection.textArabic || collection.textBulgarian || collection.textChinese || collection.textCzech}
                  </p>
                </div>
                <button className="absolute bottom-4 right-4 w-8 h-8 bg-black/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Realistic Customer Agent Voices */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Realistic Customer Agent Voices</h2>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <tbody>
                {customerAgentVoices.map((voice, index) => (
                  <tr key={voice.id} className={`hover:bg-gray-50 ${index !== customerAgentVoices.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${voice.bgColor} rounded-full flex items-center justify-center`}>
                          <span className="text-lg">{voice.avatar}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{voice.name}</h3>
                          <p className="text-xs text-gray-500 max-w-md">{voice.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-4">
                        <div className="text-xs text-gray-500">
                          <span className="flex items-center">
                            <GlobeAltIcon className="w-3 h-3 mr-1" />
                            {voice.language}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{voice.accent}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {voice.type}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">2y</span>
                          <span className="text-xs text-gray-400">2.1k</span>
                          <button className="p-1">
                            <ShareIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </button>
                          <button className="p-1">
                            <EllipsisHorizontalIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            Stop wasting months and thousands just to test...{" "}
            <button className="text-blue-600 hover:underline">
              Share
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}