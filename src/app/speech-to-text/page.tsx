"use client";

import { useState, useRef } from "react";
import {
  ArrowUpTrayIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function SpeechToTextPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Speech to text</h1>
          <p className="text-sm text-gray-600">
            Transcribe audio and video files with our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              industry-leading ASR model
            </a>
            .
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-6 py-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transcripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* No Files Message */}
          <div className="text-center mb-8">
            <DocumentDuplicateIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No transcribed files</h2>
            <p className="text-sm text-gray-600">Try uploading a file for transcription.</p>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8"
          >
            <div className="text-center">
              <DocumentDuplicateIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium mb-4"
              >
                Transcribe files
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {selectedFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
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
    </div>
  );
}