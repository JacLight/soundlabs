"use client";

import { useState, useRef } from "react";
import {
  MicrophoneIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function VoiceChangerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"settings" | "history">("settings");
  const [selectedVoice, setSelectedVoice] = useState("Liam");
  const [model, setModel] = useState("Eleven English v2");
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [styleExaggeration, setStyleExaggeration] = useState(0);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [totalDuration, setTotalDuration] = useState("0:00");
  const [credits, setCredits] = useState(81901);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Calculate duration (mock for now)
      setTotalDuration("0:00");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
      setTotalDuration("0:00");
    }
  };

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex h-full bg-[#fafafa]">
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

        {/* Settings Content */}
        {activeTab === "settings" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Voice Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Voice</label>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs">👨</span>
                  </div>
                  <span className="text-sm">{selectedVoice}</span>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Model Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Model</label>
              <div className="relative">
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none"
                >
                  <option>Eleven English v2</option>
                  <option>Eleven Multilingual v2</option>
                  <option>Eleven Turbo v2.5</option>
                </select>
                <ChevronRightIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
              </div>
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
                  <span></span>
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
                  <span></span>
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

            {/* Remove Background Noise */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">Remove Background Noise</label>
              </div>
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
              
              <button className="mt-4 text-sm text-gray-500 hover:text-gray-700 ml-auto block">
                Reset values
              </button>
            </div>
          </div>
        )}

        {/* History Content */}
        {activeTab === "history" && (
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-sm text-gray-500 text-center py-8">No history yet</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Voice Changer</h1>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">Feedback</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Documentation</button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                🗨️ Talk to El
              </button>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full max-w-2xl"
          >
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
              <div className="text-center">
                <ArrowUpTrayIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload, or drag and drop
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Audio or video files up to 50MB each
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Choose File
                  </button>
                  <span className="text-sm text-gray-500">or</span>
                  <button
                    onClick={handleRecordClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isRecording 
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <MicrophoneIcon className="w-4 h-4" />
                    <span>{isRecording ? "Stop Recording" : "Record audio"}</span>
                  </button>
                </div>

                {selectedFile && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{credits.toLocaleString()} credits remaining</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{totalDuration} total duration</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                disabled={!selectedFile}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  selectedFile 
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Generate speech
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}