"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  BeakerIcon,
  FolderIcon,
  CogIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  SparklesIcon,
  ArrowsRightLeftIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Voices", href: "/voices", icon: MicrophoneIcon },
];

const playgroundItems = [
  { name: "Text to Speech", href: "/text-to-speech", icon: DocumentTextIcon },
  { name: "Voice Changer", href: "/voice-changer", icon: ArrowsRightLeftIcon },
  { name: "Sound Effects", href: "/sound-effects", icon: SparklesIcon },
  { name: "Voice Isolator", href: "/voice-isolator", icon: GlobeAltIcon },
];

const productsItems = [
  { name: "Studio", href: "/studio", icon: BeakerIcon },
  { name: "Music", href: "/music", icon: MusicalNoteIcon },
  { name: "Dubbing", href: "/dubbing", icon: SpeakerWaveIcon },
  { name: "Speech to Text", href: "/speech-to-text", icon: DocumentTextIcon },
  { name: "Audio Native", href: "/audio-native", icon: MicrophoneIcon },
  { name: "Productions", href: "/productions", icon: FolderIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[260px] bg-white border-r border-gray-100 flex flex-col h-screen">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-blue-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xs">SL</span>
          </div>
          <span className="font-semibold text-base tracking-tight">SoundLabs</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-100">
        <button className="w-full bg-red-500 text-white rounded-md px-3.5 py-2 flex items-center justify-between hover:bg-red-600 transition-all duration-200">
          <span className="text-sm font-medium">Creative Platform</span>
          <ChevronDownIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-md transition-all duration-150 ${
                  isActive
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[13px]">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-5">
          <h3 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Playground
          </h3>
          <div className="space-y-0.5">
            {playgroundItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-md transition-all duration-150 ${
                    isActive
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-[13px]">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Products
          </h3>
          <div className="space-y-0.5">
            {productsItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-md transition-all duration-150 ${
                    isActive
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-[13px]">{item.name}</span>
                  {item.name === "Productions" && (
                    <span className="ml-auto bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-medium">
                      Beta
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="border-t border-gray-100 px-3 py-3 space-y-0.5">
        <Link
          href="/developers"
          className="flex items-center space-x-2.5 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-all duration-150"
        >
          <CogIcon className="w-4 h-4" />
          <span className="text-[13px]">Developers</span>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center space-x-2.5 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-all duration-150"
        >
          <BellIcon className="w-4 h-4" />
          <span className="text-[13px]">Notifications</span>
        </Link>
        <button className="w-full flex items-center space-x-2.5 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-all duration-150">
          <UserCircleIcon className="w-4 h-4" />
          <div className="flex-1 text-left">
            <p className="text-[13px] font-medium text-gray-900">My Account</p>
            <p className="text-[11px] text-gray-500">My Workspace</p>
          </div>
          <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}