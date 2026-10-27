import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  url?: string;
  title?: string;
  autoPlay?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  url,
  title = 'Nafis To‘y Kuyi',
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!url) return;
    const audio = new Audio(url);
    audio.loop = true;
    audioRef.current = audio;

    if (autoPlay) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy may block without user gesture
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!url) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 glass-panel-elevated rounded-2xl px-3.5 py-2.5 shadow-lg flex items-center gap-3 border border-white/90">
      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-[#231E1B] text-white flex items-center justify-center hover:bg-black transition-transform active:scale-95 shadow-xs"
        aria-label={isPlaying ? 'Musiqani to‘xtatish' : 'Musiqani tinglash'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#A89A92] flex items-center gap-1">
          <Music className="w-3 h-3 text-[#D9658B]" />
          <span>Fon Musiqasi</span>
        </span>
        <span className="text-xs font-semibold text-[#231E1B] max-w-[130px] sm:max-w-[180px] truncate">
          {title}
        </span>
      </div>

      {/* Animated audio wave bars when playing */}
      <div className="flex items-center gap-1 h-4 px-1">
        <span
          className={`w-0.5 bg-[#D9658B] rounded-full transition-all duration-300 ${
            isPlaying ? 'h-4 animate-pulse' : 'h-1.5'
          }`}
        />
        <span
          className={`w-0.5 bg-[#B9DFFA] rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3 animate-pulse delay-75' : 'h-1.5'
          }`}
        />
        <span
          className={`w-0.5 bg-[#B48B47] rounded-full transition-all duration-300 ${
            isPlaying ? 'h-5 animate-pulse delay-150' : 'h-1.5'
          }`}
        />
      </div>

      <button
        onClick={toggleMute}
        className="p-1.5 rounded-lg hover:bg-black/5 text-[#7A6A63] transition-colors"
        aria-label={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};
