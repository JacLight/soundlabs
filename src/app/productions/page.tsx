"use client";

import { useState } from "react";
import {
  DocumentTextIcon,
  DocumentDuplicateIcon,
  FilmIcon,
  MicrophoneIcon,
  PlusIcon,
  FolderIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const productionTypes = [
  {
    id: "transcript",
    title: "Transcript",
    description: "Ready in 2 days",
    price: "From $2.00/min",
    icon: DocumentTextIcon,
  },
  {
    id: "captions",
    title: "Captions",
    description: "Ready in 3 days",
    price: "From $2.20/min",
    icon: DocumentDuplicateIcon,
  },
  {
    id: "subtitles",
    title: "Subtitles",
    description: "Ready in 3 days",
    price: "From $7.00/min",
    icon: FilmIcon,
    badge: "New",
  },
  {
    id: "dub",
    title: "Dub",
    description: "Ready in 7 days",
    price: "From $22/min",
    icon: MicrophoneIcon,
    badge: "Coming soon",
  },
];

export default function ProductionsPage() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Productions</h1>
            <p className="text-sm text-gray-600">
              Order human-edited transcripts, subtitles, and dubs
            </p>
          </div>
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            ⓘ How it works
          </button>
        </div>
      </div>

      {/* Production Types Grid */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
          {productionTypes.map((type) => (
            <div
              key={type.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer relative"
            >
              {type.badge && (
                <span className={`absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded ${
                  type.badge === "New" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {type.badge}
                </span>
              )}
              <type.icon className="w-10 h-10 text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{type.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{type.description}</p>
              <p className="text-sm font-medium text-gray-900">{type.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-center max-w-2xl">
          <BookOpenIcon className="w-16 h-16 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Order human-edited transcripts, subtitles, and dubs
          </h2>
          <p className="text-gray-600 mb-8">
            Our team of expert linguists and localization professionals will deliver you polished assets ready to be distributed to your audiences.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <FolderIcon className="w-5 h-5" />
              <span>Create folder</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <PlusIcon className="w-5 h-5" />
              <span>New Production</span>
            </button>
          </div>
        </div>
      </div>

      {/* How it works panel */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How Productions Work</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Upload your content</h3>
                <p>Upload your audio or video files that need transcription, subtitles, or dubbing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Choose your service</h3>
                <p>Select from transcript, captions, subtitles, or dubbing services based on your needs.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Review and approve</h3>
                <p>Our team of professionals will process your content and deliver high-quality results.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">4. Download your assets</h3>
                <p>Once complete, download your professionally edited files ready for distribution.</p>
              </div>
            </div>
            <button
              onClick={() => setShowHowItWorks(false)}
              className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}