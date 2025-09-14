"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MicrophoneIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
  SparklesIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const quickActions = [
  {
    id: "instant-speech",
    title: "Instant speech",
    icon: MicrophoneIcon,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/text-to-speech",
  },
  {
    id: "audiobook",
    title: "Audiobook",
    icon: DocumentTextIcon,
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    href: "/audiobook",
  },
  {
    id: "agents",
    title: "ElevenLabs Agents",
    icon: SparklesIcon,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    href: "/agents",
  },
  {
    id: "music",
    title: "Music",
    icon: MusicalNoteIcon,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    href: "/music",
  },
  {
    id: "sound-effect",
    title: "Sound effect",
    icon: BeakerIcon,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    href: "/sound-effects",
  },
  {
    id: "dubbed-video",
    title: "Dubbed video",
    icon: VideoCameraIcon,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    href: "/dubbing",
  },
];

const libraryVoices = [
  {
    id: 1,
    name: "B.Giffen - Audiobook Narration & eLearning",
    description: "Pro voice talent. Seasoned, mature voice that's ideal for YouTube...",
    avatar: "🎭",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    name: "Regan - Neutral Mid-Atlantic",
    description: "Mid-Atlantic middle-aged female. Perfect for Informative content.",
    avatar: "👤",
    bgColor: "bg-purple-100",
  },
  {
    id: 3,
    name: "Brian Nguyen",
    description: "A young American-Asian Man. Voice Works well for Entertainment...",
    avatar: "🎯",
    bgColor: "bg-teal-100",
  },
  {
    id: 4,
    name: "Jameson - Guided Meditation & Narration",
    description: "A middle aged American male. Calm and relaxing voice created fo...",
    avatar: "🧘",
    bgColor: "bg-indigo-100",
  },
  {
    id: 5,
    name: "Hope - soothing narrator",
    description: "A warm, soothing, and captivating voice, ideal for audiobook...",
    avatar: "💫",
    bgColor: "bg-cyan-100",
  },
];

export default function HomePage() {
  const [remixingLive, setRemixingLive] = useState(true);

  return (
    <div className="flex flex-col h-full bg-[#fafafa] overflow-auto">
      {/* Header Banner */}
      {remixingLive && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="bg-black text-white px-2 py-1 rounded text-xs font-semibold">
              New
            </span>
            <span className="text-sm">Voice Remixing is now live</span>
            <Link href="/voice-remixing" className="text-sm underline hover:no-underline">
              Learn more →
            </Link>
          </div>
          <button
            onClick={() => setRemixingLive(false)}
            className="text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-1">My Workspace</p>
          <h1 className="text-3xl font-semibold text-gray-900">Good morning, Jacob</h1>
        </div>

        {/* Question Bar */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Have a question?</span>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              🗨️ Talk to El
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className={`w-20 h-20 ${action.bgColor} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-10 h-10 ${action.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-gray-800">{action.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Latest from the library */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest from the library</h2>
            <div className="space-y-3">
              {libraryVoices.map((voice) => (
                <div
                  key={voice.id}
                  className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className={`w-10 h-10 ${voice.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg">{voice.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {voice.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{voice.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-gray-600 hover:text-gray-900 font-medium">
              Explore Library →
            </button>
          </div>

          {/* Create or clone a voice */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create or clone a voice</h2>
            <div className="space-y-4">
              <Link
                href="/voice-design"
                className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserPlusIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Voice Design</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Design an entirely new voice from a text prompt
                  </p>
                </div>
              </Link>

              <Link
                href="/voice-clone"
                className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserGroupIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Clone your Voice</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Create a realistic digital clone of your voice
                  </p>
                </div>
              </Link>

              <Link
                href="/voice-collections"
                className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClipboardDocumentListIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Voice Collections</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Curated AI voices for every use case
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}