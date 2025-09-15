"use client";

import { useState, useRef, useEffect } from 'react';
import {
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface AudioPlayerProps {
  audioUrl: string | null;
  title?: string;
  voice?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  className?: string;
}

export default function AudioPlayer({ 
  audioUrl, 
  title = "Generated Speech",
  voice = "AI Voice",
  onPlayStateChange,
  className = ""
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(audio.duration);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePlay = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [onPlayStateChange]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current || !audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `${title}_${voice}_${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <audio ref={audioRef} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{voice}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            disabled={!audioUrl}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download"
          >
            <ArrowDownTrayIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Waveform/Progress Bar */}
      <div 
        ref={progressBarRef}
        onClick={handleProgressClick}
        className="relative h-16 bg-gray-100 rounded-lg mb-4 cursor-pointer overflow-hidden"
      >
        {/* Progress */}
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-gray-300 to-gray-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
        
        {/* Fake waveform visualization */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 bg-gray-600 mx-0.5"
              style={{ 
                height: `${20 + Math.random() * 60}%`,
                opacity: progress > (i / 50) * 100 ? 1 : 0.3
              }}
            />
          ))}
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">
            <ArrowPathIcon className="w-6 h-6 text-gray-600 animate-spin" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Play Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlayPause}
            disabled={!audioUrl || isLoading}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              audioUrl && !isLoading
                ? 'bg-black hover:bg-gray-800'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5 text-white" />
            ) : (
              <PlayIcon className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>
          
          {/* Time Display */}
          <div className="text-sm text-gray-600 min-w-[100px]">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-4 h-4 text-gray-600" />
            ) : (
              <SpeakerWaveIcon className="w-4 h-4 text-gray-600" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}