"use client";

import { useState, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  ArrowUpTrayIcon,
  GlobeAltIcon,
  FilmIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const languages = [
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "fil", name: "Filipino", flag: "🇵🇭" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
];

const dubbingProjects = [
  {
    id: 1,
    name: "Product Demo Video",
    duration: "5:34",
    languages: 5,
    status: "completed",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Tutorial Series Episode 1",
    duration: "12:45",
    languages: 3,
    status: "processing",
    date: "5 hours ago",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    duration: "2:15",
    languages: 8,
    status: "completed",
    date: "1 week ago",
  },
];

export default function DubbingPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"create" | "projects">("create");
  const [searchQuery, setSearchQuery] = useState("");
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
    if (file && (file.type.startsWith('video/'))) {
      setSelectedFile(file);
    }
  };

  const toggleLanguage = (code: string) => {
    setSelectedLanguages(prev =>
      prev.includes(code)
        ? prev.filter(lang => lang !== code)
        : [...prev, code]
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dubbing</h1>
            <p className="text-sm text-gray-600 mt-1">
              Automatically dub your videos into multiple languages with perfect lip-sync
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-sm text-gray-600 hover:text-gray-900">Documentation</button>
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
            onClick={() => setActiveTab("create")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "create"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Create New
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "projects"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            My Projects
          </button>
        </div>
      </div>

      {activeTab === "create" ? (
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-bold mr-3">
                  1
                </span>
                Upload your video
              </h2>
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors"
              >
                <FilmIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop your video file here
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supports MP4, MOV, AVI, and more (up to 1GB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
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
                      <FilmIcon className="w-8 h-8 text-gray-600" />
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

            {/* Language Selection */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-bold mr-3">
                  2
                </span>
                Select target languages
              </h2>
              
              <div className="grid grid-cols-6 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                      selectedLanguages.includes(lang.code)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
              
              {selectedLanguages.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Selected {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm font-bold mr-3">
                  3
                </span>
                Dubbing settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Lip sync</h3>
                    <p className="text-xs text-gray-500">Automatically adjust speech timing to match lip movements</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-black">
                    <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Remove background music</h3>
                    <p className="text-xs text-gray-500">Keep only the voice track for dubbing</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Watermark</h3>
                    <p className="text-xs text-gray-500">Add ElevenLabs watermark to the video</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <button
                disabled={!selectedFile || selectedLanguages.length === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedFile && selectedLanguages.length > 0
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Start Dubbing
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-6">
          {/* Search */}
          <div className="max-w-6xl mx-auto mb-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Projects List */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-4">Project Name</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-2">Languages</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Actions</div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {dubbingProjects.map((project) => (
                  <div key={project.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 items-center">
                    <div className="col-span-4">
                      <div className="flex items-center space-x-3">
                        <FilmIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{project.name}</p>
                          <p className="text-xs text-gray-500">{project.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600">{project.duration}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600">{project.languages} languages</span>
                    </div>
                    <div className="col-span-2">
                      {project.status === "completed" ? (
                        <span className="inline-flex items-center space-x-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          <CheckCircleIcon className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                          <ClockIcon className="w-3 h-3" />
                          <span>Processing</span>
                        </span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <PlayIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <ArrowDownTrayIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <DocumentTextIcon className="w-4 h-4 text-gray-600" />
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