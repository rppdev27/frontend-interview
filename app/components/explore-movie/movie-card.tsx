'use client'

import React from 'react';
import Link from 'next/link';
import { Eye, Heart, Bookmark } from 'lucide-react';
import { Movie } from '@/app/types';

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark?: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onToggleBookmark }) => {
  // Format number helper function
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Bookmark handler
  const handleToggleBookmark = (movie: Movie) => {
    if (onToggleBookmark) {
      onToggleBookmark(movie);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 z-10 transition-all duration-700">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative group overflow-hidden rounded-xl transition-all duration-700 hover:scale-105"
        >
          <div className="aspect-[2/3] w-full">
            <img
              src={movie.poster !== 'N/A' ? movie.poster : '/api/placeholder/300/450'}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white text-xs ml-1">{movie.imdbRating}</span>
              </div>
              <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                <Eye size={12} className="text-gray-300" />
                <span className="text-white text-xs ml-1">
                  {formatNumber(movie.views)}
                </span>
              </div>
              <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                <Heart size={12} className="text-gray-300" />
                <span className="text-white text-xs ml-1">
                  {formatNumber(movie.likes)}
                </span>
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg tracking-tight">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-gray-200 text-xs">
                {movie.year}
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-gray-200 text-xs truncate">
                {movie.director}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/watch/${movie.id}`}
                className="w-full backdrop-blur-md bg-white/10 rounded-lg p-3 transition-transform duration-300 hover:translate-y-[-4px] text-center"
              >
                <span className="relative z-10 text-base font-semibold text-white">
                  Watch
                </span>
              </Link>
              <button
                className="backdrop-blur-md bg-white/10 rounded-lg p-3 transition-transform duration-300 hover:translate-y-[-4px]"
                onClick={() => handleToggleBookmark(movie)}
              >
                <Bookmark size={20} className="relative z-10 text-white" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;