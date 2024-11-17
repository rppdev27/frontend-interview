'use client'

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { useFavoritesStore } from '@/app/store';
import { Movie } from '@/app/types'
import toast, { Toaster } from 'react-hot-toast';
import { 
    Filter, Search, 
    X, Swords, Film,
    Heart, Ghost,
    Bookmark,
    Moon,
    ChevronDown,
    Eye,
    Loader2,
    GalleryHorizontal,
    X as CloseIcon, Play, Pause, Volume2, VolumeX
} from 'lucide-react';

interface MovieCardProps {
  movie: Movie
}

const INITIAL_LIMIT = 4;
const DEBOUNCE_DELAY = 500; // 500ms delay for debouncing

// First, add a sort function
const sortMovies = (movies: any[], sortBy: string) => {
  const sortedMovies = [...movies];
  
  switch (sortBy) {
    case 'Views':
      return sortedMovies.sort((a, b) => b.views - a.views);
    
    case 'Likes':
      return sortedMovies.sort((a, b) => b.likes - a.likes);
    
    case 'Director':
      return sortedMovies.sort((a, b) => {
        const directorA = a.director.toLowerCase();
        const directorB = b.director.toLowerCase();
        return directorA.localeCompare(directorB);
      });
      
    default:
      return sortedMovies;
  }
};




const FilterMenu = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const searchTimeoutRef: any = useRef(null);
  const genres = [
    "Action",
    "Adventure", 
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War"
  ];

    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
    // const isMovieFavorite = isFavorite(movie.title);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Views');
    const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
    // Reference for the loader element
    const loaderRef = useRef(null);

    // Add these states in your FilterMenu component
    const [isWatchDialogOpen, setIsWatchDialogOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef: any = useRef(null);

    // Add this function to handle watch button click
    const handleWatchClick = (movie: any) => {
      setSelectedMovie(movie);
      setIsWatchDialogOpen(true);
    };

// Add this function to handle video controls
const togglePlay = () => {
  if (videoRef.current) {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
};

const toggleMute = () => {
  if (videoRef.current) {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  }
};

// Add the MovieDialog component
const MovieDialog = () => {
  if (!selectedMovie) return null;

  return (
    <Transition appear show={isWatchDialogOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50"
        onClose={() => {
          setIsWatchDialogOpen(false);
          setIsPlaying(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#1c1c1c] p-6 shadow-xl transition-all">
                {/* Close button */}
                <button 
                  onClick={() => setIsWatchDialogOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                >
                  <CloseIcon className="w-6 h-6 text-white" />
                </button>

                {/* Video Player */}
                <div className="relative aspect-video mb-4 bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    src={selectedMovie.videoSource}
                    className="w-full h-full object-contain"
                    onEnded={() => setIsPlaying(false)}
                  />
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white" />
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6 text-white" />
                        ) : (
                          <Volume2 className="w-6 h-6 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Movie Details */}
                <div className="text-white">
                  <Dialog.Title as="h3" className="text-2xl font-bold mb-2">
                    {selectedMovie.title}
                  </Dialog.Title>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span>{selectedMovie.year}</span>
                    <span>•</span>
                    <span>{selectedMovie.runtime}</span>
                    <span>•</span>
                    <span>{selectedMovie.genre}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {selectedMovie.imdbRating}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">{selectedMovie.plot}</p>

                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-400">Director: </span>
                      <span className="text-white">{selectedMovie.director}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-400">Cast: </span>
                      <span className="text-white">{selectedMovie.actors}</span>
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// Modified handleGenreSelect function
const handleGenreSelect = (genre: string) => {
  setSelectedGenre(genre);
  setIsDropdownOpen(false);

  if (genre === 'All') {
    // Reset using original movies
    setMovies(originalMovies);
    setVisibleMovies(originalMovies.slice(0, INITIAL_LIMIT));
    return;
  }

  // Filter movies from original movies array
  const filteredMovies = originalMovies.filter((movie: any) => 
    movie.genre.split(', ').includes(genre)
  );
  
  setMovies(filteredMovies);
  setVisibleMovies(filteredMovies.slice(0, INITIAL_LIMIT));
};


    const filterButtons = [
        {
          label: "Views",
          icon: Eye
        },
        {
          label: "Likes",
          icon: Heart
        },
        {
          label: "Director",
          icon: Film
        },
        // {
        //   label: "All",
        //   icon: 'GalleryHorizontal'
        // }
      ];

  const notify = () => toast.success('Added to favorite');  

  const handleToggleBookmark = (data_movie: any) => {
    console.log(data_movie);
    addFavorite(data_movie);
    notify();
    // setIsOpen(true);
  }  
  
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [rating, setRating] = useState([0, 10]);
  const [selectedGenres, setSelectedGenres]: any = useState([]);
  const [yearRange, setYearRange] = useState([1900, 2024]);
  // Add a new state to keep original movies
  const [originalMovies, setOriginalMovies] = useState([]);

  const categories = [
    { 
      id: 1, 
      title: 'Thriller',
      Icon: Swords,
      genre: 'Science Fiction, Fantasy',
      bgColor: 'bg-[#FFE4E1]'
    },
    { 
      id: 5, 
      title: 'Drama',
      Icon: Film,
      genre: 'Drama, Romance',
      bgColor: 'bg-[#E6E6FA]'
    },
    { 
      id: 7, 
      title: 'Romance',
      Icon: Heart,
      genre: 'Romance, Drama',
      bgColor: 'bg-[#FFF0F5]'
    },
    { 
      id: 8, 
      title: 'Horror',
      Icon: Ghost,
      genre: 'Horror, Thriller',
      bgColor: 'bg-[#F5F5DC]'
    },
    { 
        id: 5, 
        title: 'Drama',
        Icon: Film,
        genre: 'Drama, Romance',
        bgColor: 'bg-[#E6E6FA]'
      },
      { 
        id: 7, 
        title: 'Romance',
        Icon: Heart,
        genre: 'Romance, Drama',
        bgColor: 'bg-[#FFF0F5]'
      },
      { 
        id: 8, 
        title: 'Horror',
        Icon: Ghost,
        genre: 'Horror, Thriller',
        bgColor: 'bg-[#F5F5DC]'
      },
  ];

// Add state for selected genre
const [selectedGenre, setSelectedGenre] = useState('All');


// Modify getRandomMovies to store original movies
const getRandomMovies = async () => {
  try {
      setLoading(true);
      setError(null);
     
      const response = await fetch('/api/movies');
      const data = await response.json();
     
      if (data.success) {
          const allMovies = data.data.default;
          // Store all movies in both states
          setOriginalMovies(allMovies); // Keep original copy
          setMovies(allMovies);
          setVisibleMovies(allMovies.slice(0, INITIAL_LIMIT));
          setFilteredMovies([]);
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

const loadMore = async () => {
  // Only load more if there are more movies to show
  if (!loading && visibleMovies.length < movies.length) {
      try {
          setLoading(true);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const currentLength = visibleMovies.length;
          const nextMovies = movies.slice(currentLength, currentLength + INITIAL_LIMIT);
          
          // Check if there are actually more movies to load
          if (nextMovies.length > 0) {
              setVisibleMovies(prev => [...prev, ...nextMovies]);
          }
      } finally {
          setLoading(false);
      }
  }
};


 // Debounced search handler
 const handleSearchChange = (e: any) => {
  const value = e.target.value;
  setSearchText(value);

  // Clear existing timeout
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }

  // Set new timeout
  searchTimeoutRef.current = setTimeout(() => {
    setDebouncedSearchText(value);
  }, DEBOUNCE_DELAY);
};

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Use debouncedSearchText for API calls
  useEffect(() => {
    if (debouncedSearchText !== '') {
      searchMovies(debouncedSearchText);
    } else {
      getRandomMovies();
    }
  }, [debouncedSearchText]);

// Update the searchMovies function to maintain genre filtering
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
      
      // Store the search results as original movies too
      setOriginalMovies(moviesToShow);
      
      // Apply genre filter if active
      if (selectedGenre !== 'All') {
        moviesToShow = moviesToShow.filter((movie: any) => 
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


    // Modified useEffect for search debouncing
    useEffect(() => {
      console.log('searchMovies');
        const timerId = setTimeout(() => {
            if (searchText) {
                searchMovies(searchText);
            } else {
                getRandomMovies();
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [searchText]);

    // Initial data fetch
    useEffect(() => {
      console.log('getRandomMovies');
        getRandomMovies();
    }, []);

    // Modified applyFilters function
    const applyFilters = async () => {
      try {
          setLoading(true);
          
          let filterUrl = '/api/movies/search?';
          
          if (selectedGenres.length > 0) {
              filterUrl += `genre=${encodeURIComponent(selectedGenres[0])}`;
          }
          
          if (yearRange[0] !== 1900 || yearRange[1] !== 2024) {
              filterUrl += `&year=${yearRange[0]}`;
          }
          
          const response = await fetch(filterUrl);
          const data = await response.json();
          
          if (data.success) {
              setMovies(data.data); // Update full movies array
              setVisibleMovies(data.data.slice(0, INITIAL_LIMIT)); // Show initial set
          } else {
              setMovies([]); // Clear both arrays if no results
              setVisibleMovies([]);
              setError('No movies found with the selected filters.');
          }
      } catch (err) {
          console.error('Error applying filters:', err);
          setError('Failed to apply filters. Please try again.');
      } finally {
          setLoading(false);
          setIsModalOpen(false);
      }
  };

// Update the filter button click handler
const handleFilterClick = (filterLabel: string) => {
  setActiveFilter(filterLabel);
  
  if (filterLabel === 'All') {
    // Reset to original order
    setVisibleMovies(movies.slice(0, INITIAL_LIMIT));
    return;
  }

  // Sort the full movies array
  const sortedMovies: any = sortMovies(movies, filterLabel);
  setMovies(sortedMovies);
  // Update visible movies with the first batch
  setVisibleMovies(sortedMovies.slice(0, INITIAL_LIMIT));
};

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                loadMore();
            }
        },
        { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
        observer.observe(currentLoader);
    }

    return () => {
        if (currentLoader) {
            observer.unobserve(currentLoader);
        }
    };
}, [visibleMovies.length, movies.length]);


return (
  <div className="min-h-screen bg-white dark:bg-[#252424] transition-colors duration-300" style={{ fontFamily: 'Jost' }}>
    <div className="container mx-auto py-3 px-3 md:px-12 w-[79%]">
      <div className="p-0">
        {/* Categories Section */}
        <div className="mb-0 w-full">
          <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className='flex items-center gap-1.5 mb-2'>
                  <div className='w-1 h-4 dark:bg-[#c3e647] bg-slate-900'></div>
                  <span className='uppercase font-bold tracking-wider text-xl text-[#252424] dark:text-white whitespace-nowrap'>Browse Movie</span>
              </div>
          </div> 
        </div>

        <div className="max-w-full my-2">
          <div className="relative flex items-center w-full gap-2 p-1.5 bg-gray-100 dark:bg-[#1c1c1c] rounded-lg border border-gray-200 dark:border-[#2b2b2b] focus-within:border-gray-300 dark:focus-within:border-[#333333] transition-colors">
            {/* Search Icon */}
            <div className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-[#808080]">
              <Search size={18} />
            </div>

            {/* Input and Dropdown Container */}
            <div className="flex-1 flex items-center">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchText}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent text-gray-700 dark:text-[#808080] placeholder-gray-500 dark:placeholder-[#808080] text-sm focus:outline-none"
              />

              {/* Genre Selector */}
              <div className="relative">
                <button
                  className="flex items-center ml-2 hover:opacity-90 transition-opacity"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-gray-200 dark:bg-[#252525] border border-gray-300 dark:border-[#2b2b2b]">
                    <span className="text-gray-700 dark:text-[#808080] font-medium text-sm">
                      {selectedGenre}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`
                        text-gray-600 dark:text-[#808080] transform transition-transform duration-200 ease-in-out
                        ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}
                      `}
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#252525] rounded-lg shadow-lg z-[999999] py-2 animate-in fade-in slide-in-from-top-1 duration-200 border border-gray-200 dark:border-[#2b2b2b]">
                    <button
                      className={`
                        w-full px-4 py-2 text-left text-sm transition-colors
                        ${selectedGenre === 'All'
                          ? 'text-black dark:text-white bg-gray-100 dark:bg-[#2b2b2b]'
                          : 'text-gray-600 dark:text-[#808080] hover:text-black hover:dark:text-white hover:bg-gray-100 hover:dark:bg-[#2b2b2b]'
                        }
                      `}
                      onClick={() => handleGenreSelect('All')}
                    >
                      All
                    </button>

                    {genres.map((genre, index) => (
                      <button
                        key={index}
                        className={`
                          w-full px-4 py-2 text-left text-sm transition-colors
                          ${selectedGenre === genre
                            ? 'text-black dark:text-white bg-gray-100 dark:bg-[#2b2b2b]'
                            : 'text-gray-600 dark:text-[#808080] hover:text-black hover:dark:text-white hover:bg-gray-100 hover:dark:bg-[#2b2b2b]'
                          }
                        `}
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
            <button
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md 
                border transition-all duration-200
                bg-white dark:bg-[#252525] border-transparent text-[#252424] dark:text-white
              `}
            >
              <Filter size={14} className="dark:text-[#c3e647] text-slate-900" />
            </button>
            
            {filterButtons.map((filter, index) => (
              <button
                key={index}
                onClick={() => handleFilterClick(filter.label)}
                className={`
                  flex items-center gap-2 px-2 py-1.5 rounded-md 
                  border transition-all duration-200
                  ${activeFilter === filter.label 
                    ? 'bg-white dark:bg-[#252525] border-gray-300 dark:border-[#333333] text-black dark:text-white' 
                    : 'bg-gray-100 dark:bg-[#1c1c1c] border-gray-200 dark:border-[#2b2b2b] text-gray-600 dark:text-[#808080] hover:bg-white hover:dark:bg-[#252525] hover:text-black hover:dark:text-white'
                  }
                `}
              >
                {typeof filter.icon === 'string' ? (
                  <GalleryHorizontal size={14} className={activeFilter === filter.label ? 'text-black dark:text-white' : 'text-gray-600 dark:text-[#808080]'} />
                ) : (
                  <filter.icon size={14} className={activeFilter === filter.label ? 'text-black dark:text-white' : 'text-gray-600 dark:text-[#808080]'} />
                )}
                <span className="text-xs font-medium">{filter.label}</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 z-10 transition-all duration-700">
          {(visibleMovies.length > 0 ? visibleMovies : movies).map((movie: any, index: any) => (
            <div 
              key={movie.imdbID || index} 
              className="relative group overflow-hidden rounded-xl transition-all duration-700 hover:scale-105"
            >
              {/* Movie Poster */}
              <div className="aspect-[2/3] w-full">
                <img
                  src={movie.poster !== 'N/A' ? movie.poster : '/api/placeholder/300/450'}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content Container */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                {/* Stats Row */}
                <div className="flex items-center gap-2 mb-2">
                  {/* Rating */}
                  <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-xs ml-1">{movie.imdbRating || "7.9"}</span>
                  </div>

                  {/* Views */}
                  <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                    <Eye size={12} className="text-gray-300" />
                    <span className="text-white text-xs ml-1">
                      {movie.views > 1000000 
                        ? `${(movie.views / 1000000).toFixed(1)}M`
                        : movie.views > 1000
                        ? `${(movie.views / 1000).toFixed(1)}K`
                        : movie.views}
                    </span>
                  </div>

                  {/* Likes */}
                  <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                    <Heart size={12} className="text-gray-300" />
                    <span className="text-white text-xs ml-1">
                      {movie.likes > 1000000 
                        ? `${(movie.likes / 1000000).toFixed(1)}M`
                        : movie.likes > 1000
                        ? `${(movie.likes / 1000).toFixed(1)}K`
                        : movie.likes}
                    </span>
                  </div>
                </div>

                {/* Movie Title */}
                <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg tracking-tight">
                  {movie.title}
                </h3>
                
                {/* Year and Director */}
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-gray-200 text-xs">
                    {movie.year}
                  </p>
                  <span className="text-gray-400">•</span>
                  <p className="text-gray-200 text-xs truncate">
                    {movie.director}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                <Link 
                  href={`/watch/${movie.id || 2}`} 
                  className="w-full backdrop-blur-md bg-white/10 rounded-lg p-3 transition-transform duration-300 hover:translate-y-[-4px] text-center"
                >
                  <span className="relative z-10 text-base font-semibold text-white">Watch</span>
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

        {/* Loader element */}
        {visibleMovies.length < movies.length && (
          <div 
            ref={loaderRef}
            className="w-full py-8 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 border-4 border-gray-700 dark:border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-700 dark:text-white font-medium">Loading more movies...</span>
              </div>
            ) : (
              <div className="h-12" />
            )}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && (filteredMovies.length > 0 ? filteredMovies : movies).length === 0 && (
          <div className="text-center py-4 text-gray-600 dark:text-gray-400">No movies found</div>
        )}
      </div>
    </div>
    
    <MovieDialog />
    <Toaster position="bottom-right" reverseOrder={false} />
  </div>
);
};

export default FilterMenu;