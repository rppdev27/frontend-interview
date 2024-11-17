'use client'

import React, { useEffect, useState } from 'react';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { 
    Swords, 
    Film,
    Heart,
    Ghost,
    Play,
    Bookmark,
    Flame,
    Star, 
    Moon,
    ChevronDown,
    Image,
    Eye,
    Loader2,
    GalleryHorizontal
} from 'lucide-react';

const FilterMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Views');

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
        {
          label: "All",
          icon: 'GalleryHorizontal'
        }
      ];
  
  const categoriez = [
    {
      id: 1,
      title: "Shots",
      selected: true
    },
    {
      id: 2,
      title: "Designers",
      selected: false
    },
    {
      id: 3,
      title: "Teams",
      selected: false
    }
  ];



  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [rating, setRating] = useState([0, 10]);
  const [selectedGenres, setSelectedGenres]: any = useState([]);
  const [yearRange, setYearRange] = useState([1900, 2024]);

  const API_KEY = 'c9e84fd9';

  const genres: any = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Drama", "Fantasy", "Horror", "Mystery", "Romance",
    "Sci-Fi", "Thriller"
  ];

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

  const movieTitles = [
    'Batman', 'Spider-Man', 'Iron Man', 'Avatar', 'Matrix',
    'Star Wars', 'Inception', 'Titanic', 'Jurassic Park', 'Avengers',
    'Harry Potter', 'Lord of the Rings', 'Terminator', 'Godfather', 'Frozen'
  ];

  const MovieSkeleton = () => (
    <div className="relative overflow-hidden rounded-xl bg-[#1c1c1c]">
        <div className="aspect-[2/3] w-full animate-pulse">
            {/* Poster skeleton */}
            <div className="w-full h-full bg-[#333333]" />
        </div>
        
        {/* Content skeleton */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
            {/* Rating skeleton */}
            <div className="flex items-center gap-1 mb-2">
                <div className="h-6 w-16 bg-[#333333] rounded-md animate-pulse" />
            </div>
            
            {/* Title skeleton */}
            <div className="h-6 w-3/4 bg-[#333333] rounded mb-1 animate-pulse" />
            
            {/* Year skeleton */}
            <div className="h-4 w-1/4 bg-[#333333] rounded mb-3 animate-pulse" />
            
            {/* Buttons skeleton */}
            <div className="flex gap-2">
                <div className="h-10 w-full bg-[#333333] rounded-lg animate-pulse" />
                <div className="h-10 w-10 bg-[#333333] rounded-lg animate-pulse" />
            </div>
        </div>
    </div>
);

// Create an array of 12 skeleton items
const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(12)].map((_, index) => (
            <MovieSkeleton key={index} />
        ))}
    </div>
);

  const handleGenreChange = (genre: any) => {
    setSelectedGenres((prev:any) => {
      if (prev.includes(genre)) {
        return prev.filter((g: any) => g !== genre);
      }
      return [...prev, genre];
    });
  };

  const handleRatingChange = (e: any) => {
    const value = parseFloat(e.target.value);
    const isMin = e.target.name === 'minRating';
    setRating(prev => isMin ? [value, prev[1]] : [prev[0], value]);
  };

  const handleYearChange = (e: any) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.name === 'minYear';
    setYearRange(prev => isMin ? [value, prev[1]] : [prev[0], value]);
  };

  const applyFilters = () => {
    const filtered = movies.filter((movie: any) => {
      // Rating filter
      const movieRating = parseFloat(movie.imdbRating) || 0;
      const isInRatingRange = movieRating >= rating[0] && movieRating <= rating[1];

      // Year filter
      const movieYear = parseInt(movie.Year) || 0;
      const isInYearRange = movieYear >= yearRange[0] && movieYear <= yearRange[1];

      // Genre filter
      let matchesGenre = true;
      if (selectedGenres.length > 0) {
        const movieGenres = movie.Genre?.split(', ') || [];
        matchesGenre = selectedGenres.some((genre: any) => movieGenres.includes(genre));
      }

      return isInRatingRange && isInYearRange && matchesGenre;
    });

    setFilteredMovies(filtered);
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setRating([0, 10]);
    setSelectedGenres([]);
    setYearRange([1900, 2024]);
    setFilteredMovies([]);
  };

  const getRandomMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const randomTitles = [...movieTitles]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);

      const moviePromises = randomTitles.map(title =>
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
          .then(res => res.json())
      );

      const results = await Promise.all(moviePromises);
      const validMovies: any = results.filter(movie => movie.Response === "True");
      setMovies(validMovies);
      setFilteredMovies([]);
      console.log(validMovies);
      validMovies.forEach((movie: any, index: any) => {
        console.log(`\nMovie ${index + 1}:`);
        console.log(JSON.stringify(movie, null, 2));
      });
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomMovies();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchText]);

  useEffect(() => {
    const searchMovies = async () => {
      if (!debouncedSearch) {
        getRandomMovies();
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(debouncedSearch)}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setFilteredMovies([]);
        } else {
          setMovies([]);
          setError('No movies found.');
        }
      } catch (err) {
        setError('Failed to search movies. Please try again.');
        console.error('Error searching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [debouncedSearch]);

  // Custom Modal Component
  const FilterModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        />
        
        {/* Modal Content */}
        <div className="relative bg-[#252424] text-white rounded-xl shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filter Movies</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-200 mb-3">Rating Range</h3>
              <div className="space-y-2">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400">Min Rating</label>
                    <input
                      type="number"
                      name="minRating"
                      min="0"
                      max="10"
                      step="0.1"
                      value={rating[0]}
                      onChange={handleRatingChange}
                      className="w-full px-3 py-2 bg-[#333333] rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c3e647]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-400">Max Rating</label>
                    <input
                      type="number"
                      name="maxRating"
                      min="0"
                      max="10"
                      step="0.1"
                      value={rating[1]}
                      onChange={handleRatingChange}
                      className="w-full px-3 py-2 bg-[#333333] rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c3e647]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Year Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-200 mb-3">Year Range</h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-400">From Year</label>
                  <input
                    type="number"
                    name="minYear"
                    min="1900"
                    max="2024"
                    value={yearRange[0]}
                    onChange={handleYearChange}
                    className="w-full px-3 py-2 bg-[#333333] rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c3e647]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400">To Year</label>
                  <input
                    type="number"
                    name="maxYear"
                    min="1900"
                    max="2024"
                    value={yearRange[1]}
                    onChange={handleYearChange}
                    className="w-full px-3 py-2 bg-[#333333] rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c3e647]"
                  />
                </div>
              </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-200 mb-3">Genres</h3>
              <div className="grid grid-cols-2 gap-2">
                {genres.map((genre: any) => (
                  <label
                    key={genre}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className="w-4 h-4 rounded border-gray-600 text-[#c3e647] focus:ring-[#c3e647] bg-[#333333]"
                    />
                    <span className="text-sm text-gray-200">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={resetFilters}
                className="flex-1 px-4 py-2 bg-transparent border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2 bg-[#c3e647] text-black rounded-lg hover:bg-[#b3d637] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const genrez = [
    { icon: <Flame size={20} />, label: 'Trending' },
    { icon: <Swords size={20} />, label: 'Action' },
    { icon: <Heart size={20} />, label: 'Romance' },
    { icon: <Ghost size={20} />, label: 'Horror' },
    { icon: <Star size={20} />, label: 'Special' },
    { icon: <Moon size={20} />, label: 'Drakor' },
  ];

  return (
    <div className="min-h-screen bg-[#252424]" style={{ fontFamily: 'Jost' }}>
      <div className="container mx-auto px-16 py-10">
        <div className="p-0">
          {/* Categories Section */}
          <div className="mb-0 w-full">
            <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className='flex items-center gap-1.5'>
                    <div className='w-0.5 h-4 bg-[#c3e647]'></div>
                    <span className='uppercase font-bold tracking-wider text-xl text-white whitespace-nowrap'>Browse Movie</span>
                </div>
            </div> 
          </div>

          <div className="max-w-full my-2">
      <div className="relative flex items-center w-full gap-2 p-1.5 bg-[#1c1c1c] rounded-lg border border-[#2b2b2b] focus-within:border-[#333333] transition-colors">
        {/* Search Icon */}
        <div className="flex items-center justify-center w-10 h-10 text-[#808080]">
          <Search size={18} />
        </div>

        {/* Input and Dropdown Container */}
        <div className="flex-1 flex items-center">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 bg-transparent text-[#808080] placeholder-[#808080] text-sm focus:outline-none"
          />

          {/* Category Selector */}
          <div className="relative">
            <button
              className="flex items-center ml-2 hover:opacity-90 transition-opacity"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#252525] border border-[#2b2b2b]">
                <span className="text-[#808080] font-medium text-sm">All</span>
                <ChevronDown
                  size={14}
                  className={`
                    text-[#808080] transform transition-transform duration-200 ease-in-out
                    ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}
                  `}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#252525] rounded-lg shadow-lg z-[999999] py-2 animate-in fade-in slide-in-from-top-1 duration-200 border border-[#2b2b2b]">
                {categories.map((category: any) => (
                  <button
                    key={category.id}
                    className={`
                      w-full px-4 py-2 text-left text-sm transition-colors
                      ${category.selected
                        ? 'text-[#ffffff] bg-[#2b2b2b]'
                        : 'text-[#808080] hover:text-[#ffffff] hover:bg-[#2b2b2b]'
                      }
                    `}
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Buttons - Now right aligned */}
      <div className="flex gap-2 mt-2 justify-end">
      <button
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md 
              border transition-all duration-200
              'bg-[#252525] border-[transparent] text-white'
              }
            `}
          >
            <Filter size={14} className={`text-[#c3e647]`} />
            {/* <span className="text-xs font-medium">{filter.label}</span> */}
          </button>
        {filterButtons.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter.label)}
            className={`
              flex items-center gap-2 px-2 py-1.5 rounded-md 
              border transition-all duration-200
              ${activeFilter === filter.label 
                ? 'bg-[#252525] border-[#333333] text-white' 
                : 'bg-[#1c1c1c] border-[#2b2b2b] text-[#808080] hover:bg-[#252525] hover:text-white'
              }
            `}
          >
            <filter.icon size={14} className={`${activeFilter === filter.label ? 'text-white' : 'text-[#808080]'}`} />
            <span className="text-xs font-medium">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>

          {/* Filter Modal */}
          <FilterModal />

          {/* Loading State */}
          {loading ? (
                <SkeletonGrid />
            ) : error ? (
                <div className="text-center text-red-400 py-4">{error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 z-10">
                  {(filteredMovies.length > 0 ? filteredMovies : movies).map((movie: any, index: any) => (
              <div 
                key={movie.imdbID || index} 
                className="relative group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
              >
                {/* Movie Poster */}
                <div className="aspect-[2/3] w-full">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content Container */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white text-xs ml-1">{movie.imdbRating || "7.9"}</span>
                    </div>
                  </div>

                  {/* Movie Title */}
                  <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg tracking-tight">
                    {movie.Title}
                  </h3>
                  
                  {/* Year */}
                  <p className="text-gray-200 text-xs mb-3">
                    {movie.Year}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                  <button
                    className="flex items-center justify-center p-2
                                rounded-lg transition-all duration-200 text-white
                                relative overflow-hidden w-full text-center
                                before:absolute before:inset-0 before:bg-black/30 before:backdrop-blur-sm
                                after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-transparent
                                hover:before:bg-black/40"
                    >
                        <span className="relative z-10 text-xs font-semibold">Watch</span>
                    </button>
                    <button 
                      className="flex items-center justify-center p-2 
                               rounded-lg transition-all duration-200
                               relative overflow-hidden
                               before:absolute before:inset-0 before:bg-black/30 before:backdrop-blur-sm
                               after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-transparent
                               hover:before:bg-black/40"
                    >
                      <Bookmark size={20} className="relative z-10 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* No Results */}
          {!loading && !error && (filteredMovies.length > 0 ? filteredMovies : movies).length === 0 && (
            <div className="text-center py-4 text-gray-400">No movies found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;