"use client";

import { useState, useRef } from "react";
import {
  ArrowUpTrayIcon,
  SpeakerWaveIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  DocumentArrowDownIcon,
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const processedFiles = [
  {
    id: 1,
    name: "Interview_Recording.mp3",
    originalDuration: "12:45",
    status: "completed",
    voiceTracks: 2,
    processedAt: "3 hours ago",
  },
  {
    id: 2,
    name: "Podcast_Episode.wav",
    originalDuration: "45:20",
    status: "processing",
    voiceTracks: 3,
    processedAt: "10 minutes ago",
  },
  {
    id: 3,
    name: "Music_Demo.mp3",
    originalDuration: "3:24",
    status: "completed",
    voiceTracks: 1,
    processedAt: "2 days ago",
  },
];

export default function VoiceIsolatorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"isolate" | "history">("isolate");
  const [isolationMode, setIsolationMode] = useState<"voice" | "instrumental">("voice");
  const [quality, setQuality] = useState("high");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
    }
  };

  const handleProcess = () => {
    if (selectedFile) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setActiveTab("history");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Voice Isolator</h1>
            <p className="text-sm text-gray-600 mt-1">
              Extract and isolate voice tracks from any audio or video file
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-sm text-gray-600 hover:text-gray-900">How it works</button>
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
            onClick={() => setActiveTab("isolate")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "isolate"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Isolate Voice
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "history"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Processing History
          </button>
        </div>
      </div>

      {activeTab === "isolate" ? (
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-bold mr-3">
                  1
                </span>
                Upload your audio or video file
              </h2>
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors"
              >
                <SpeakerWaveIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop your file here
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supports MP3, WAV, FLAC, MP4, MOV and more (up to 500MB)
                </p>
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
                
                {selectedFile && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left inline-block">
                    <div className="flex items-center space-x-3">
                      <DocumentArrowDownIcon className="w-8 h-8 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Isolation Mode */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-bold mr-3">
                  2
                </span>
                Choose isolation mode
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsolationMode("voice")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isolationMode === "voice"
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <MicrophoneIcon className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Extract Voice</h3>
                  <p className="text-sm text-gray-500">
                    Isolate vocals and speech from background music and noise
                  </p>
                </button>
                
                <button
                  onClick={() => setIsolationMode("instrumental")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isolationMode === "instrumental"
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <MusicalNoteIcon className="w-10 h-10 mx-auto mb-3 text-gray-700" />
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Extract Instrumental</h3>
                  <p className="text-sm text-gray-500">
                    Remove vocals to get clean instrumental tracks
                  </p>
                </button>
              </div>
            </div>

            {/* Processing Settings */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-bold mr-3">
                  3
                </span>
                Processing settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Quality</label>
                  <div className="flex space-x-3">
                    {["high", "medium", "fast"].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`px-4 py-2 rounded-lg capitalize transition-all ${
                          quality === q
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {q === "high" ? "High Quality" : q === "medium" ? "Balanced" : "Fast Processing"}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {quality === "high" 
                      ? "Best quality, slower processing" 
                      : quality === "medium"
                      ? "Good quality with reasonable speed"
                      : "Fastest processing, standard quality"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Enhance clarity</h3>
                    <p className="text-xs text-gray-500">Apply AI enhancement to improve audio quality</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-black">
                    <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Split stereo tracks</h3>
                    <p className="text-xs text-gray-500">Process left and right channels separately</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Process Button */}
            <div className="flex justify-end">
              <button
                onClick={handleProcess}
                disabled={!selectedFile || isProcessing}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedFile && !isProcessing
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Start Processing"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-6">
          {/* Processing History */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Processed Files</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {processedFiles.map((file) => (
                  <div key={file.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          file.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                        }`}>
                          <SpeakerWaveIcon className={`w-6 h-6 ${
                            file.status === "completed" ? "text-green-600" : "text-yellow-600"
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-gray-500">Duration: {file.originalDuration}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{file.voiceTracks} voice track{file.voiceTracks !== 1 ? 's' : ''}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{file.processedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.status === "completed" ? (
                          <>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                              <PlayIcon className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="px-3 py-1.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                              <ArrowDownTrayIcon className="w-4 h-4 inline-block mr-1" />
                              Download
                            </button>
                          </>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            Processing...
                          </span>
                        )}
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