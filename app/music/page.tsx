"use client";

import { useState, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  MusicalNoteIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  HeartIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  DocumentDuplicateIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const genres = [
  "Electronic", "Rock", "Pop", "Jazz", "Classical", "Hip Hop",
  "R&B", "Country", "Ambient", "Folk", "Blues", "Reggae",
  "Latin", "Metal", "Soul", "Funk", "World", "Experimental"
];

const moods = [
  "Uplifting", "Energetic", "Relaxing", "Melancholic", "Intense",
  "Dreamy", "Dark", "Happy", "Mysterious", "Romantic", "Epic", "Chill"
];

const instruments = [
  "Piano", "Guitar", "Drums", "Bass", "Violin", "Synthesizer",
  "Saxophone", "Trumpet", "Flute", "Cello", "Organ", "Harp"
];

const recentTracks = [
  {
    id: 1,
    title: "Summer Breeze",
    genre: "Electronic",
    duration: "3:24",
    mood: "Uplifting",
    createdAt: "2 hours ago",
    liked: true,
  },
  {
    id: 2,
    title: "Midnight Jazz",
    genre: "Jazz",
    duration: "4:15",
    mood: "Relaxing",
    createdAt: "5 hours ago",
    liked: false,
  },
  {
    id: 3,
    title: "Epic Orchestra",
    genre: "Classical",
    duration: "5:42",
    mood: "Epic",
    createdAt: "1 day ago",
    liked: false,
  },
];

export default function MusicPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [duration, setDuration] = useState("30");
  const [activeTab, setActiveTab] = useState<"generate" | "library">("generate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [likedTracks, setLikedTracks] = useState<Set<number>>(new Set([1]));

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrument)
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  const toggleLike = (trackId: number) => {
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab("library");
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Music Generation</h1>
            <p className="text-sm text-gray-600 mt-1">
              Create AI-generated music tracks with custom genres, moods, and instruments
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-sm text-gray-600 hover:text-gray-900">Tutorial</button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              🗨️ Talk to El
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("generate")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "generate"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Generate
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "library"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            My Library
          </button>
        </div>
      </div>

      {activeTab === "generate" ? (
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6">
            {/* Prompt Section */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <SparklesIcon className="w-5 h-5 inline-block mr-2" />
                Describe your music
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., An upbeat electronic track with tropical vibes, perfect for a summer party..."
                className="w-full h-24 px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Genre Selection */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <MusicalNoteIcon className="w-5 h-5 inline-block mr-2" />
                Genre
              </h2>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(selectedGenre === genre ? "" : genre)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedGenre === genre
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Selection */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <SpeakerWaveIcon className="w-5 h-5 inline-block mr-2" />
                Mood
              </h2>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(selectedMood === mood ? "" : mood)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedMood === mood
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Instruments */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <MicrophoneIcon className="w-5 h-5 inline-block mr-2" />
                Instruments
              </h2>
              <div className="flex flex-wrap gap-2">
                {instruments.map((instrument) => (
                  <button
                    key={instrument}
                    onClick={() => toggleInstrument(instrument)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedInstruments.includes(instrument)
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {instrument}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <ClockIcon className="w-5 h-5 inline-block mr-2" />
                Duration
              </h2>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="15"
                  max="300"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-700 w-20">
                  {Math.floor(Number(duration) / 60)}:{(Number(duration) % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isGenerating
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Music"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-6">
          {/* Library */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Tracks</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentTracks.map((track) => (
                  <div key={track.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setPlayingTrackId(playingTrackId === track.id ? null : track.id)}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {playingTrackId === track.id ? (
                            <PauseIcon className="w-5 h-5 text-gray-700" />
                          ) : (
                            <PlayIcon className="w-5 h-5 text-gray-700" />
                          )}
                        </button>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{track.title}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-gray-500">{track.genre}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{track.mood}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{track.duration}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{track.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleLike(track.id)}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        >
                          {likedTracks.has(track.id) ? (
                            <HeartIconSolid className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <ArrowDownTrayIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <ShareIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <DocumentDuplicateIcon className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}