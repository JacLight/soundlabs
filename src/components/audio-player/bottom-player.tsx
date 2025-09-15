import { IconRenderer } from '@/components/ui/icon-renderer';
import { useSiteStore } from '@/context/site-store';
import { classNames, round } from '@/lib/appengine/utils/helpers';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useShallow } from 'zustand/shallow';

const isEmpty = (obj: any): boolean => {
  return !obj || Object.keys(obj).length === 0;
};

export const BottomAudioPlayer = () => {
  const { audioPlayer, audioInfo, setStateItem, setAudioPlayerState } = useSiteStore().ui(
    useShallow((state) => ({
      audioPlayer: state.audioPlayer,
      audioInfo: state.audioInfo,
      setStateItem: state.setStateItem,
      setAudioPlayerState: state.setAudioPlayerState,
    })),
  );
  const [progress, setProgress] = useState({
    playedSeconds: 0,
    loadedSeconds: 0,
  });
  const [duration, setDuration] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState('');

  useEffect(() => {
    setTimeDisplay(`${round(progress.playedSeconds / 60)}:${round(progress.playedSeconds % 60)} / ${round(duration / 60)}:${round(duration % 60)}`);
  }, [progress, duration]);

  const ref: any = useRef(null);

  const pausePlay = () => {
    setAudioPlayerState({ playing: !audioPlayer.playing });
  };

  const mute = () => {
    setAudioPlayerState({ muted: !audioPlayer.muted });
  };

  const setVolume = (volume: number) => {
    setAudioPlayerState({ volume });
  };

  const skipForward = () => {
    const seekTime = ref.current.getCurrentTime() + 20;
    ref.current.seekTo(seekTime, 'seconds', true);
  };

  const skipBackward = () => {
    const seekTime = ref.current.getCurrentTime() - 20;
    ref.current.seekTo(seekTime, 'seconds', true);
  };

  const handleSpeed = () => {
    const { playbackRate } = audioPlayer;
    const newSpeed = playbackRate === 2 ? 0.5 : playbackRate + 0.5;
    setAudioPlayerState({ playbackRate: newSpeed });
  };

  const handleProgress = (state: any) => {
    setProgress(state);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    setAudioPlayerState({ playing: false });
    document.querySelectorAll('.audio-playing').forEach((el) => {
      el.classList.remove('audio-playing');
      el.classList.add('audio-ended');
    });
  };

  const closeAudioPlayer = () => {
    setStateItem({ audioInfo: null });
    document.querySelectorAll('.audio-playing').forEach((el) => {
      el.classList.remove('audio-playing');
      el.classList.add('audio-stopped');
    });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const seekTime = e.nativeEvent.offsetX / (e.target as HTMLElement).offsetWidth;
    ref.current.seekTo(seekTime, 'fraction', true);
  };

  if (isEmpty(audioInfo)) return null;

  const { playing: isPlaying, muted, volume, playbackRate } = audioPlayer;

  return (
    <div className="button-audio-player fixed bottom-0 inset-x-0 z-30 shadow-[0px_-2px_4px_0px_#ccc] bg-white">
      <div className="progress w-full relative cursor-pointer h-1" onClick={handleSeek}>
        <div
          className="progress-buffer bg-gray-300 h-1 absolute top-0 left-0"
          style={{ width: `${(progress.loadedSeconds / duration) * 100}%` }}
        ></div>
        <div
          className="progress-played bg-sky-300 h-1 absolute top-0 left-0"
          style={{ width: `${(progress.playedSeconds / duration) * 100}%` }}
        ></div>
      </div>
      <div className="flex p-4 justify-between items-center">
        <div className="audio-info flex gap-4 items-center justify-start">
          <div
            className={classNames(
              isPlaying && 'animate-[spin_8s_infinite_linear]',
              'audio-cover-image w-10 h-10 md:w-8 md:h-8 bg-gray-200 rounded-full linear infinite overflow-hidden',
            )}
          >
            {audioInfo.coverImage?.url && <img src={audioInfo.coverImage?.url} className="w-full h-full" alt="Album art" />}
          </div>
          <div>
            <div className="audio-title font-medium">{audioInfo.title}</div>
            <div className="audio-description text-sm text-gray-600">{audioInfo.description}</div>
          </div>
        </div>
        <div className="hidden lg:flex gap-10 items-center">
          <button className="skip-back hover:scale-125 text-gray-700 transition-all duration-100" onClick={skipBackward}>
            <IconRenderer icon="Rewind" size={20} />
          </button>
          <button
            className="play-pause bg-neutral-100 hover:bg-gray-200 hover:scale-110 hover:shadow p-4 rounded-full transition-all duration-100"
            onClick={pausePlay}
          >
            <IconRenderer icon={isPlaying ? 'Pause' : 'Play'} size={24} />
          </button>
          <button className="skip-forward hover:scale-125 text-gray-700 transition-all duration-100" onClick={skipForward}>
            <IconRenderer icon="FastForward" size={20} />
          </button>
          <button
            className="playback-speed hover:scale-110 transition-all duration-100 text-xs border-gray-300 border rounded-lg px-3 py-1"
            onClick={handleSpeed}
          >
            {playbackRate}x
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="hidden lg:flex gap-2 items-center">
            <button className="mute hover:scale-125 text-gray-700 transition-all duration-100" onClick={mute}>
              <IconRenderer icon={muted ? 'VolumeX' : 'Volume2'} size={20} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step={0.01}
              value={volume}
              className="slider h-1 w-20"
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
          <button
            onClick={pausePlay}
            className="lg:hidden flex-shrink-0 flex items-center justify-center rounded-full focus:outline-none focus:shadow-outline hover:bg-neutral-100 dark:hover:bg-neutral-700/80 w-10 h-10 md:w-12 md:h-12"
          >
            <IconRenderer icon={isPlaying ? 'Pause' : 'Play'} size={20} />
          </button>
          <div className="hidden lg:flex gap-1 items-center text-xs">{timeDisplay}</div>
          <button
            onClick={closeAudioPlayer}
            className="flex-shrink-0 flex items-center justify-center rounded-full focus:outline-none focus:shadow-outline hover:bg-neutral-100 dark:hover:bg-neutral-700/80 w-10 h-10 md:w-12 md:h-12"
          >
            <IconRenderer icon="X" size={20} />
          </button>
        </div>
        <div className="fixed top-0 left-0 w-1 h-1 -z-50 opacity-0 overflow-hidden invisible">
          <ReactPlayer
            ref={ref}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            url={audioInfo.url}
            onDuration={handleDuration}
            onEnded={handleEnded}
            onProgress={handleProgress}
            playing={isPlaying}
            style={{ width: '100%', height: '100%' }}
            className="bg-neutral-900 inset-0 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};
