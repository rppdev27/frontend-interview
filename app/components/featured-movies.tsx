'use client'

import React, { useState, useRef } from 'react';
import { Play, Bookmark, Search  } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const videoRef: any = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // const handleBookmark = () => {
  //   setIsBookmarked(!isBookmarked);
  // };

  return (
    <div
      className='relative flex justify-center align-middle items-center py-3 px-3 md:px-16 md:py-10
        bg-white dark:bg-[#252424] text-[#252424] dark:text-white z-40 min-h-[400px] flex-col transition-colors duration-300'
      style={{
        fontFamily: 'Jost'
      }}
    >
    
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url("https://template.gentechtreedesign.com/html/streamlab/red-html/images/background/asset-24.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay with different opacity for light/dark modes */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-colors duration-300"></div>
      </div>

      {/* Content */}
      <div className='relative z-10 p-3 md:p-8 w-4/5 flex flex-col md:flex-row gap-6 bg-white/80 dark:bg-[rgba(34,34,34,0.7)] backdrop-blur-sm rounded-lg transition-colors duration-300'>
        {/* Left Content */}
        <div className='flex-1 flex flex-col gap-3'>
            {/* Blue accent line and bookmark */}
            <div className='flex items-center justify-between mb-1'>
                <div className='flex items-center gap-2'>
                    <div className='w-0.5 h-4 dark:bg-[#c3e647] bg-slate-800'></div>
                    <span className='uppercase font-bold tracking-wider text-[10px] md:text-xs text-[#252424] dark:text-white transition-colors duration-300'>High Rated</span>
                </div>
            </div>

            {/* Title */}
            <h1 className='text-xl md:text-3xl font-bold tracking-wider mb-1 md:mb-2 text-[#252424] dark:text-white transition-colors duration-300'>
                THIEVE THE BANK
            </h1>

            {/* Rating Section */}
            <div className='flex items-center gap-3 mb-3 md:mb-4'>
                <span className='px-2 py-0.5 border border-gray-300 dark:border-white/20 text-[10px] text-[#252424] dark:text-white transition-colors duration-300'>TV-MA</span>
                <span className='text-[10px] text-[#252424] dark:text-white'>•</span>
                <div className='flex items-center gap-1.5'>
                    <img src="https://template.gentechtreedesign.com/html/streamlab/red-html/images/asset-2.png" alt="IMDb" className="h-3" />
                    <span className='text-sm text-[#252424] dark:text-white transition-colors duration-300'>9.5</span>
                </div>
            </div>

            {/* Description */}
            <p className='text-gray-600 dark:text-gray-300 max-w-2xl mb-4 md:mb-6 text-[10px] md:text-sm tracking-wide transition-colors duration-300'>
                Streamlab is a long established fact that a reader will be distracted by the readable
                content of a page when Streamlab at its layout Streamlab.
            </p>

            {/* Movie Details */}
            <div className='flex flex-col gap-2 mb-4 md:mb-6 text-[10px] md:text-sm tracking-wide'>
                <div className='flex gap-2'>
                    <span className='dark:text-[#c3e647] text-[#252424]'>Cast :</span>
                    <span className='text-[#252424] dark:text-white transition-colors duration-300'>Jennifer Lonez, Mars Shelley</span>
                </div>
                <div className='flex gap-2'>
                    <span className='dark:text-[#c3e647] text-[#252424]'>Genre :</span>
                    <span className='text-[#252424] dark:text-white transition-colors duration-300'>Action, Mystery</span>
                </div>
            </div>

            {/* Updated Buttons Section */}
            <div className='flex flex-col sm:flex-row items-center gap-3 md:gap-4'>
                {/* Play Now Button */}
                <button 
                    onClick={handlePlayClick}
                    className='w-full sm:w-auto flex items-center justify-center dark:bg-[#c3e647] bg-[#252424] text-white dark:text-[#252424] px-4 md:px-8 py-2 min-w-[120px] hover:bg-opacity-90 transition-all text-xs rounded-sm'
                >
                    <span className='font-medium'>
                        {isPlaying ? 'PAUSE' : 'PLAY NOW'}
                    </span>
                </button>
                {/* Watch Trailer Button */}
                <button className='w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 text-[#252424] dark:text-white hover:text-[#c3e647] transition-all group'>
                    <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-[#c3e647] transition-all'>
                        <Play className='w-3 h-3 text-slate-800' fill='currentColor' />
                    </div>
                    <span className='font-medium tracking-wide text-xs'>WATCH TRAILER</span>
                </button>
            </div>
        </div>

        {/* Video Section */}
        <div className='w-full md:w-1/2 self-center'>
            <div className='rounded-lg overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.5)] relative group transition-all duration-300'>
                <video 
                    ref={videoRef}
                    className='w-full h-full object-cover rounded-lg'
                    src="https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4"
                    playsInline
                    loop
                >
                    Your browser does not support the video tag.
                </video>
                {/* Play overlay */}
                {!isPlaying && (
                    <div className='absolute inset-0 bg-black/30 dark:bg-black/40 flex items-center justify-center group-hover:bg-black/20 dark:group-hover:bg-black/30 transition-all cursor-pointer'
                         onClick={handlePlayClick}>
                        <Play className='w-10 h-10 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all' />
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;