"use client";

import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  StarIcon,
  SpeakerWaveIcon,
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const categories = [
  { id: "animals", name: "Animals", gradient: "from-orange-500 to-red-600" },
  { id: "bass", name: "Bass", gradient: "from-blue-600 to-indigo-700" },
  { id: "booms", name: "Booms", gradient: "from-red-600 to-pink-600" },
  { id: "braams", name: "Braams", gradient: "from-purple-600 to-pink-600" },
  { id: "brass", name: "Brass", gradient: "from-yellow-500 to-orange-600" },
  { id: "cymbals", name: "Cymbals", gradient: "from-cyan-600 to-blue-600" },
  { id: "devices", name: "Devices", gradient: "from-gray-600 to-gray-800" },
  { id: "drones", name: "Drones", gradient: "from-pink-600 to-purple-700" },
  { id: "drums", name: "Drums", gradient: "from-green-600 to-teal-600" },
  { id: "electronic", name: "Electronic", gradient: "from-violet-600 to-purple-700" },
  { id: "foley", name: "Foley", gradient: "from-amber-600 to-orange-600" },
  { id: "impacts", name: "Impacts", gradient: "from-red-700 to-rose-600" },
];

const soundEffects = [
  {
    id: 1,
    name: "Ambient sound of a forest. Gentle wind moving through the trees, occasional birds singing...",
    category: "Nature",
    duration: "30s",
    downloads: 316,
    audioUrl: "/audio/forest.mp3",
  },
  {
    id: 2,
    name: "boom swoosh",
    category: "Whooshes",
    duration: "4s",
    downloads: 108,
    audioUrl: "/audio/boom.mp3",
  },
  {
    id: 3,
    name: "A quick digital heartbeat mixed with a smooth bass tap. Energetic, stylish, and unforgettable...",
    category: "Bass",
    duration: "2s",
    downloads: 98,
    audioUrl: "/audio/heartbeat.mp3",
  },
  {
    id: 4,
    name: "The calm sound of gentle bird songs in a quiet forest. Soft, melodic chirps and whistles ec...",
    category: "Nature",
    duration: "30s",
    downloads: 337,
    audioUrl: "/audio/birds.mp3",
  },
  {
    id: 5,
    name: "Realistic sound effect of fast typing on a computer keyboard, mechanical keys clicking...",
    category: "Office",
    duration: "8s",
    downloads: 15,
    audioUrl: "/audio/typing.mp3",
  },
  {
    id: 6,
    name: "Ambient sounds of a peaceful countryside, gentle brook flowing under a wooden bridge...",
    category: "Nature",
    duration: "30s",
    downloads: 15,
    audioUrl: "/audio/countryside.mp3",
  },
  {
    id: 7,
    name: "cash register receiving money",
    category: "Office",
    duration: "4s",
    downloads: 13,
    audioUrl: "/audio/cash.mp3",
  },
  {
    id: 8,
    name: "transition boom to next scary scene",
    category: "Horror",
    duration: "5.5s",
    downloads: 13,
    audioUrl: "/audio/horror.mp3",
  },
];

export default function SoundEffectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("trending");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("explore");
  const [generateText, setGenerateText] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (id: number, audioUrl: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl || "";
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setPlayingId(id);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setPlayingId(null);
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      <audio ref={audioRef} />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Sound Effects</h1>
            <div className="flex items-center space-x-6">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Feedback
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Documentation
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Soundboard
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 border-b border-gray-100">
            <button
              onClick={() => setActiveTab("explore")}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === "explore"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === "history"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === "favorites"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Favorites
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 relative w-28 h-28 rounded-xl bg-gradient-to-br ${category.gradient} p-3 flex flex-col items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer shadow-lg`}
              >
                <span className="text-xs font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-6 py-4">
          {/* Search and Filters */}
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sound effects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => addFilter("Category")}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <span>Category</span>
              </button>
              
              <button
                onClick={() => addFilter("Looping")}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <span>Looping</span>
              </button>
              
              <button
                onClick={() => addFilter("Duration")}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <span>Duration</span>
              </button>

              <div className="relative">
                <button className="flex items-center space-x-2 px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Trending</span>
                  <ChevronDownIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {selectedFilters.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                {selectedFilters.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="hover:text-gray-900"
                    >
                      <XMarkIcon className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sound Effects Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Duration</div>
              <div className="col-span-2 text-center">Downloads</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {soundEffects.map((sound) => (
                <div
                  key={sound.id}
                  className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-gray-50 transition-colors items-center group"
                >
                  <div className="col-span-6 flex items-center space-x-3">
                    <button
                      onClick={() => togglePlay(sound.id, sound.audioUrl)}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-all duration-200 shadow-sm"
                    >
                      {playingId === sound.id ? (
                        <PauseIcon className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <PlayIcon className="w-3.5 h-3.5 text-white ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate font-medium">
                        {sound.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{sound.category}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-600">{sound.duration}</span>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-600">{sound.downloads.toLocaleString()}</span>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-center space-x-1">
                    <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                      <SpeakerWaveIcon className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                      <ArrowDownTrayIcon className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(sound.id)}
                      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      {favorites.includes(sound.id) ? (
                        <StarIconSolid className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <StarIcon className="w-4 h-4 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Section */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <textarea
                  value={generateText}
                  onChange={(e) => setGenerateText(e.target.value)}
                  placeholder="Describe a sound..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>200 / 61,901</span>
                    <div className="flex items-center space-x-2">
                      <button className="px-2 py-1 rounded hover:bg-gray-100">Off</button>
                      <button className="px-2 py-1 rounded hover:bg-gray-100">Auto</button>
                      <button className="px-2 py-1 rounded hover:bg-gray-100">30%</button>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                    Generate speech
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Generations may be shared to Explore page for other users to download.{" "}
              <button className="text-gray-600 hover:text-gray-800 underline">Disable</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}