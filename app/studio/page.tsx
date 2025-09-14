"use client";

import { useState, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  FolderOpenIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ClockIcon,
  ChartBarIcon,
  CogIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const projects = [
  {
    id: 1,
    name: "Podcast Episode 12",
    type: "Multitrack",
    duration: "45:32",
    tracks: 4,
    lastModified: "2 hours ago",
    status: "editing",
  },
  {
    id: 2,
    name: "Audiobook Chapter 5",
    type: "Single Voice",
    duration: "28:15",
    tracks: 1,
    lastModified: "1 day ago",
    status: "completed",
  },
  {
    id: 3,
    name: "Commercial Voice Over",
    type: "Voice Over",
    duration: "0:45",
    tracks: 2,
    lastModified: "3 days ago",
    status: "review",
  },
  {
    id: 4,
    name: "Training Video Narration",
    type: "Educational",
    duration: "15:20",
    tracks: 1,
    lastModified: "1 week ago",
    status: "completed",
  },
];

const templates = [
  { id: 1, name: "Podcast", icon: MicrophoneIcon, description: "Multi-track podcast recording" },
  { id: 2, name: "Audiobook", icon: DocumentTextIcon, description: "Long-form narration" },
  { id: 3, name: "Voice Over", icon: SpeakerWaveIcon, description: "Commercial or video narration" },
  { id: 4, name: "Blank Project", icon: PlusIcon, description: "Start from scratch" },
];

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "create">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleCreateProject = () => {
    if (projectName && selectedTemplate) {
      setShowNewProjectModal(false);
      setProjectName("");
      setSelectedTemplate(null);
      setActiveTab("projects");
    }
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Studio</h1>
            <p className="text-sm text-gray-600 mt-1">
              Professional audio production workspace for all your projects
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              onClick={() => setShowNewProjectModal(true)}>
              <PlusIcon className="w-4 h-4 inline-block mr-2" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-6">
        <div className="flex space-x-6">
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
          <button
            onClick={() => setActiveTab("create")}
            className={`px-1 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === "create"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Quick Record
          </button>
        </div>
      </div>

      {activeTab === "projects" ? (
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

          {/* Projects Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{project.type}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <PencilIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <TrashIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-gray-900">{project.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Tracks</span>
                      <span className="font-medium text-gray-900">{project.tracks}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Modified</span>
                      <span className="font-medium text-gray-900">{project.lastModified}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "editing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {project.status === "completed" ? "Completed" : project.status === "editing" ? "Editing" : "In Review"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Quick Record Interface */}
            <div className="bg-white rounded-xl p-8 mb-6">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                    isRecording ? "bg-red-100" : "bg-gray-100"
                  }`}>
                    <MicrophoneIcon className={`w-16 h-16 ${
                      isRecording ? "text-red-600" : "text-gray-600"
                    }`} />
                  </div>
                  {isRecording && (
                    <span className="absolute top-0 right-0 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-mono font-medium text-gray-900">
                    {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:
                    {(recordingTime % 60).toString().padStart(2, '0')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {isRecording ? "Recording..." : "Ready to record"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isRecording
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <StopIcon className="w-5 h-5 inline-block mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <MicrophoneIcon className="w-5 h-5 inline-block mr-2" />
                      Start Recording
                    </>
                  )}
                </button>
                {isRecording && (
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    <PauseIcon className="w-5 h-5 inline-block mr-2" />
                    Pause
                  </button>
                )}
              </div>
            </div>

            {/* Audio Settings */}
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <CogIcon className="w-5 h-5 inline-block mr-2" />
                Recording Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Input Device</label>
                  <select className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                    <option>Default Microphone</option>
                    <option>USB Audio Interface</option>
                    <option>Built-in Microphone</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Audio Quality</label>
                  <select className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                    <option>High (320 kbps)</option>
                    <option>Medium (192 kbps)</option>
                    <option>Low (128 kbps)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Format</label>
                  <select className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                    <option>MP3</option>
                    <option>WAV</option>
                    <option>FLAC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recent Recordings */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <ClockIcon className="w-5 h-5 inline-block mr-2" />
                Recent Recordings
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <PlayIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Recording_001.mp3</p>
                      <p className="text-xs text-gray-500">2:34 • 5 minutes ago</p>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                    <ArrowDownTrayIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <PlayIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Recording_002.mp3</p>
                      <p className="text-xs text-gray-500">5:12 • 1 hour ago</p>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                    <ArrowDownTrayIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Project</h2>
            
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Choose Template</label>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTemplate === template.id
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <template.icon className="w-8 h-8 text-gray-600 mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!projectName || !selectedTemplate}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  projectName && selectedTemplate
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}