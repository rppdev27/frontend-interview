'use client'

import React, { useState, useEffect } from 'react';
import { Loader2, Star, ThumbsUp, Eye } from 'lucide-react';

const MovieDataFetch = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

//   const movieTitles = [
//     'Batman', 'Spider-Man', 'Iron Man', 'Avatar', 'Matrix',
//     'Star Wars', 'Inception', 'Titanic', 'Jurassic Park', 'Avengers',
//     'Harry Potter', 'Lord of the Rings', 'Terminator', 'Godfather', 'Frozen',
//   ];

const movieTitles = [
    'Iron Man',
    'The Dark Knight',
    'Avatar',
    'Inception',
    'The Avengers',
    'Frozen',
    'Guardians of the Galaxy',
    'Jurassic World',
    'Star Wars: The Force Awakens',
    'Captain America: Civil War',
    'Wonder Woman',
    'Black Panther',
    'Avengers: Infinity War',
    'Spider-Man: Into the Spider-Verse',
    'Avengers: Endgame',
    'Joker',
    'Parasite',
    '1917',
    'Spider-Man: No Way Home',
    'Top Gun: Maverick',
    'The Batman',
    'Everything Everywhere All at Once',
    'Avatar: The Way of Water',
    'Barbie',
    'Oppenheimer',
    'Mission: Impossible - Dead Reckoning Part One',
    'Guardians of the Galaxy Vol. 3',
    'The Lord of the Rings: The Fellowship of the Ring',
    'Harry Potter and the Sorcerer\'s Stone',
    'Spider-Man',
    'Finding Nemo',
    'The Incredibles',
    'Batman Begins',
    'Casino Royale',
    'Transformers',
    'Up',
    'Toy Story 3',
    'Fast Five',
    'The Hunger Games',
    'Gravity',
    'Interstellar',
    'Mad Max: Fury Road',
    'Deadpool',
    'Get Out',
    'A Star Is Born',
    'Once Upon a Time in Hollywood',
    'Dune',
    'John Wick: Chapter 4',
    'Fast X',
    'The Matrix Reloaded',
    'Pirates of the Caribbean: The Curse of the Black Pearl',
    'King Kong',
    '300',
    'I Am Legend',
    'Iron Man 2',
    'Thor',
    'The Amazing Spider-Man',
    'Man of Steel',
    'Edge of Tomorrow',
    'Inside Out',
    'Doctor Strange',
    'Logan',
    'Aquaman',
    'Knives Out',
    'Tenet',
    'No Time to Die',
    'Black Panther: Wakanda Forever',
    'Ant-Man and the Wasp: Quantumania',
    'The Dark Knight Rises',
    'Django Unchained',
    'Pacific Rim',
    'X-Men: Days of Future Past',
    'The Martian',
    'Rogue One: A Star Wars Story',
    'Thor: Ragnarok',
    'Ready Player One',
    'Godzilla vs. Kong',
    'The Flash',
    'Blue Beetle',
    'Gran Turismo',
    'Teenage Mutant Ninja Turtles: Mutant Mayhem',
    'Indiana Jones and the Dial of Destiny',
    'The Little Mermaid',
    'Dungeons & Dragons: Honor Among Thieves',
    'Transformers: Rise of the Beasts',
    'The Super Mario Bros. Movie',
    'Creed III',
    'Shazam! Fury of the Gods',
    'Aquaman and the Lost Kingdom',
    'Wonka',
    'Black Adam',
    'The Green Mile',
    'Gladiator',
    'The Matrix',
    'Fight Club',
    'Memento',
    'The Departed',
    'The Prestige',
    'The Social Network',
    'Inglourious Basterds',
    'The Wolf of Wall Street',
    'Pulp Fiction',
    'Forrest Gump',
    'The Shawshank Redemption',
    'Goodfellas',
    'Jurassic Park',
    'The Lion King',
    'Titanic',
    'The Silence of the Lambs',
    'Saving Private Ryan',
    'The Godfather',
    'Schindler\'s List',
    'The Lord of the Rings: The Two Towers',
    'The Lord of the Rings: The Return of the King',
    'Back to the Future',
    'Raiders of the Lost Ark',
    'E.T. the Extra-Terrestrial',
    'Star Wars: Episode V - The Empire Strikes Back',
    'The Terminator',
    'Aliens',
    'Die Hard',
    'Blade Runner',
    'The Breakfast Club',
    'The Princess Bride',
    'Ghostbusters',
    'Top Gun',
    'The Karate Kid',
    'A Nightmare on Elm Street',
    'The Thing',
    'Scarface',
    'Full Metal Jacket',
    // Adding 5 more titles to reach exactly 100
    'Jaws',
    'The Exorcist',
    'Rocky',
    'Apocalypse Now',
    'One Flew Over the Cuckoo\'s Nest'
];

  // Function to generate random stats
  const addRandomStats = (movie: any) => {
    return {
      ...movie,
      views: Math.floor(Math.random() * 10000000) + 1000000, // Random views between 1M and 11M
      likes: Math.floor(Math.random() * 500000) + 100000, // Random likes between 100K and 600K
      videoSource: "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
      videoYoutube: `https://www.youtube.com/watch?v=mqqft2x_Aa4`
    };
  };


  const API_KEY = 'c9e84fd9';
  const getRandomMovies = async () => {
    try {
      setLoading(true);
      const randomTitles = [...movieTitles]
        .sort(() => Math.random() - 0.5)
        .slice(0, 70); // Reduced to 12 movies for better display

      const moviePromises = randomTitles.map(title =>
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
          .then(res => res.json())
      );

      const results = await Promise.all(moviePromises);
      const validMovies: any = results
        .filter(movie => movie.Response === "True")
        .map(addRandomStats);
      
      setMovies(validMovies);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomMovies();
  }, []);

  const formatNumber = (num: any) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">
                {movies.map((movie: any, index: any) => (
                    <div 
                        key={index} 
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700"
                    >
                        {/* Poster Image */}
                        <div className="relative w-full h-96">
                            {movie.Poster && movie.Poster !== "N/A" ? (
                                <img 
                                    src={movie.Poster} 
                                    alt={`${movie.Title} poster`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-400">No poster available</span>
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            {/* Header */}
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-white truncate">
                                    {movie.Title}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {movie.Director} • {movie.Year}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <div className="h-32 overflow-y-auto text-sm text-gray-300 scrollbar-thin scrollbar-thumb-gray-600">
                                    {movie.Plot}
                                </div>
                                
                                <div className="text-sm text-gray-400">
                                    Runtime: {movie.Runtime}
                                </div>
                                
                                <div className="text-sm text-gray-400">
                                    Cast: {movie.Actors}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="text-yellow-500">{movie.imdbRating}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Eye className="w-4 h-4 text-blue-500" />
                                        <span className="text-gray-300">{formatNumber(movie.views)}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <ThumbsUp className="w-4 h-4 text-green-500" />
                                        <span className="text-gray-300">{formatNumber(movie.likes)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
};

export default MovieDataFetch;