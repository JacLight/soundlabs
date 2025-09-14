"use client";

import { useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

export default function AudioNativePage() {
  const [activeTab, setActiveTab] = useState<"pages" | "settings">("pages");
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Audio Native</h1>
          <p className="text-sm text-gray-600">
            Automatically voices content of a web page using ElevenLab's text-to-speech service
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("pages")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "pages"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Pages
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "settings"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "pages" ? (
          <div className="max-w-4xl mx-auto">
            {/* Get Started Section */}
            <div className="bg-white rounded-xl p-8 mb-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SpeakerWaveIcon className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Get started with Audio Native</h2>
              <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
                An embedded player that automatically parses the content of your blog posts and voices it using text-to-speech.
              </p>
              
              {/* Audio Player Demo */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">ElevenLabs</span>
                    <span className="text-sm text-gray-500">—</span>
                    <span className="text-sm text-gray-500">Audio</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>66:66</span>
                    <SpeakerWaveIcon className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-5 h-5 text-white" />
                    ) : (
                      <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div className="w-0 h-full bg-black rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-sm text-gray-600">1.5x</button>
                    <button className="p-1">
                      <ArrowPathIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <span className="text-xs text-gray-500">1ElevenLabs</span>
                </div>
              </div>
              
              <button className="text-sm text-blue-600 hover:underline">Skip onboarding</button>
            </div>

            {/* Player Appearance Section */}
            <div className="bg-white rounded-xl p-6">
              <div className="mb-6">
                <span className="inline-block w-8 h-8 bg-gray-100 rounded-full text-center leading-8 font-semibold text-gray-700 mr-3">
                  1
                </span>
                <span className="text-lg font-semibold">Player appearance</span>
                <p className="text-sm text-gray-600 mt-2 ml-11">
                  Customize the background color and text color of the embedded player.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 ml-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-10 h-10 border border-gray-200 rounded cursor-pointer"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 border border-gray-200 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6 ml-11">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                <div 
                  className="rounded-lg p-4 border border-gray-200"
                  style={{ backgroundColor, color: textColor }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">ElevenLabs — Audio</span>
                    <span className="text-sm">66:66</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* URL Allowlist Section */}
            <div className="bg-white rounded-xl p-6 mt-6">
              <div className="mb-6">
                <span className="inline-block w-8 h-8 bg-gray-100 rounded-full text-center leading-8 font-semibold text-gray-700 mr-3">
                  2
                </span>
                <span className="text-lg font-semibold">URL allowlist</span>
                <p className="text-sm text-gray-600 mt-2 ml-11">
                  The Audio Native player will only work on web pages that match the URLs that you specify in this list.
                </p>
              </div>

              <div className="ml-11">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Add URL
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
              <p className="text-sm text-gray-600">Configure your Audio Native settings here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}