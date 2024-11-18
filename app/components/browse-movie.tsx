'use client'

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '@/app/store';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '@/app/components/explore-movie/movie-card'
import { Movie } from '../types';
import { 
  Filter, Search, 
  ChevronDown,
  Eye,
  Loader2,
  Heart,
} from 'lucide-react';

interface FilterButtonType {
  label: 'Views' | 'Likes';
  icon: typeof Eye | typeof Heart;
}

// Constants
const INITIAL_LIMIT = 4;
const DEBOUNCE_DELAY = 500;
const GENRES = [
  "Action", "Adventure", "Animation", "Biography", "Comedy",
  "Crime", "Drama", "Family", "Fantasy", "History",
  "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "War"
] as const;

const FILTER_BUTTONS: FilterButtonType[] = [
  { label: 'Views', icon: Eye },
  { label: 'Likes', icon: Heart }
];

const FilterMenu = () => {
  // State
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const [originalMovies, setOriginalMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'Views' | 'Likes'>('Views');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Refs
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  
  // Hooks
  const { addFavorite } = useFavoritesStore();

  // Sort function
  const sortMovies = (moviesToSort: Movie[], sortBy: string): Movie[] => {
    return [...moviesToSort].sort((a, b) => {
      switch (sortBy) {
        case 'Views':
          return b.views - a.views;
        case 'Likes':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  };

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchText(value);
    }, DEBOUNCE_DELAY);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setIsDropdownOpen(false);

    const baseMovies = genre === 'All' 
      ? originalMovies
      : originalMovies.filter(movie => movie.genre.split(', ').includes(genre));

    setMovies(baseMovies);
    setVisibleMovies(baseMovies.slice(0, INITIAL_LIMIT));
  };

  const handleFilterClick = (filterLabel: 'Views' | 'Likes') => {
    setActiveFilter(filterLabel);
    const sortedMovies = sortMovies(movies, filterLabel);
    setMovies(sortedMovies);
    setVisibleMovies(sortedMovies.slice(0, INITIAL_LIMIT));
  };

  const handleToggleBookmark = (movie: Movie) => {
    addFavorite(movie);
    toast.success('Added to favorites');
  };

  // API calls
  const getRandomMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/movies');
      const data = await response.json();
      
      if (data.success) {
        const allMovies = data.data.default;
        setOriginalMovies(allMovies);
        setMovies(allMovies);
        setVisibleMovies(allMovies.slice(0, INITIAL_LIMIT));
      } else {
        setError('Failed to fetch movies.');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (searchTerm: string) => {
    if (!searchTerm) {
      getRandomMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/movies/search?title=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (data.success) {
        let moviesToShow = data.data;
        setOriginalMovies(moviesToShow);
        
        if (selectedGenre !== 'All') {
          moviesToShow = moviesToShow.filter((movie: Movie) => 
            movie.genre.split(', ').includes(selectedGenre)
          );
        }

        setMovies(moviesToShow);
        setVisibleMovies(moviesToShow.slice(0, INITIAL_LIMIT));
      } else {
        setMovies([]);
        setVisibleMovies([]);
        setOriginalMovies([]);
        setError('No movies found.');
      }
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!loading && visibleMovies.length < movies.length) {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const currentLength = visibleMovies.length;
        const nextMovies = movies.slice(currentLength, currentLength + INITIAL_LIMIT);
        
        if (nextMovies.length > 0) {
          setVisibleMovies(prev => [...prev, ...nextMovies]);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Effects
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (debouncedSearchText !== '') {
      searchMovies(debouncedSearchText);
    } else {
      getRandomMovies();
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleMovies.length, movies.length]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#252424] transition-colors duration-300 font-jost">
      <div className="container mx-auto py-3 px-3 md:px-12 w-[79%]">
        <div className="p-0">
          {/* Header */}
          <div className="mb-0 w-full">
            <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1 h-4 dark:bg-[#c3e647] bg-slate-900" />
                <span className="uppercase font-bold tracking-wider text-xl text-[#252424] dark:text-white whitespace-nowrap">
                  Browse Movie
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-full my-2">
            <div className="relative flex items-center w-full gap-2 p-1.5 bg-gray-100 dark:bg-[#1c1c1c] rounded-lg border border-gray-200 dark:border-[#2b2b2b] focus-within:border-gray-300 dark:focus-within:border-[#333333] transition-colors">
              <Search size={18} className="text-gray-500 dark:text-[#808080] ml-2" />
              
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="flex-1 bg-transparent text-gray-700 dark:text-[#808080] placeholder-gray-500 dark:placeholder-[#808080] text-sm focus:outline-none"
                />

                {/* Genre Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center ml-2 hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-gray-200 dark:bg-[#252525] border border-gray-300 dark:border-[#2b2b2b]">
                      <span className="text-gray-700 dark:text-[#808080] font-medium text-sm">
                        {selectedGenre}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-gray-600 dark:text-[#808080] transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#252525] rounded-lg shadow-lg z-50 py-2 animate-in fade-in slide-in-from-top-1 duration-200 border border-gray-200 dark:border-[#2b2b2b]">
                      <button
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          selectedGenre === 'All'
                            ? 'text-black dark:text-white bg-gray-100 dark:bg-[#2b2b2b]'
                            : 'text-gray-600 dark:text-[#808080] hover:text-black hover:dark:text-white hover:bg-gray-100 hover:dark:bg-[#2b2b2b]'
                        }`}
                        onClick={() => handleGenreSelect('All')}
                      >
                        All
                      </button>

                      {GENRES.map((genre) => (
                        <button
                          key={genre}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            selectedGenre === genre
                              ? 'text-black dark:text-white bg-gray-100 dark:bg-[#2b2b2b]'
                              : 'text-gray-600 dark:text-[#808080] hover:text-black hover:dark:text-white hover:bg-gray-100 hover:dark:bg-[#2b2b2b]'
                          }`}
                          onClick={() => handleGenreSelect(genre)}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mt-2 mb-4 justify-end">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-200 bg-white dark:bg-[#252525] border-transparent text-[#252424] dark:text-white">
                <Filter size={14} className="dark:text-[#c3e647] text-slate-900" />
              </button>
              
              {FILTER_BUTTONS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => handleFilterClick(label)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md border transition-all duration-200 ${
                    activeFilter === label 
                      ? 'bg-white dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-black dark:text-white' 
                      : 'bg-gray-100 dark:bg-[#1c1c1c] border-gray-200 dark:border-[#2b2b2b] text-gray-600 dark:text-[#808080] hover:bg-white hover:dark:bg-[#252525] hover:text-black hover:dark:text-white'
                  }`}
                >
                  <Icon size={14} className={activeFilter === label ? 'text-black dark:text-white' : 'text-gray-600 dark:text-[#808080]'} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400 mx-auto my-2 font-semibold">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading movies...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-red-500 dark:text-red-400 py-4">{error}</div>
          )}

          {/* Movie Grid */}
          <MovieGrid movies={visibleMovies} onToggleBookmark={handleToggleBookmark}/>

          {/* Load More */}
          {visibleMovies.length < movies.length && (
            <div 
              ref={loaderRef}
              className="w-full py-8 flex items-center justify-center"
            >
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 border-4 border-gray-700 dark:border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-700 dark:text-white font-medium">
                    Loading more movies...
                  </span>
                </div>
              ) : (
                <div className="h-12" />
              )}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && movies.length === 0 && (
            <div className="text-center py-4 text-gray-600 dark:text-gray-400">
              No movies found
            </div>
          )}
        </div>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

// Utility function for formatting numbers
const formatNumber = (num: number): string => {
  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num > 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export default FilterMenu;