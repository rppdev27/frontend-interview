'use client'
import React from 'react'
import { BookmarkCheck, Bookmark } from 'lucide-react'
import { Movie } from '@/app/types'
import { useFavoritesStore } from '@/app/store'

interface MovieCardProps {
    movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()
    const isMovieFavorite = isFavorite(movie.title)
   
    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent event bubbling
        if (isMovieFavorite) {
            removeFavorite(movie.title)
        } else {
            addFavorite(movie)
        }
    }

    return (
        <div className="cursor-pointer relative w-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Image Container */}
            <div className="relative h-80 overflow-hidden">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover object-center transition-transform duration-500 ease-out hover:scale-110"
                    loading="lazy"
                />
           
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
               
                {/* Favorite Button */}
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-3 right-3 p-2 rounded-full
                        ${isMovieFavorite
                            ? 'bg-[#c3e647]/20 hover:bg-[#c3e647]/30'
                            : 'bg-black/20 hover:bg-black/30'}
                        backdrop-blur-sm transition-all duration-200
                        transform hover:scale-110 active:scale-95`}
                    aria-label={isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isMovieFavorite ? (
                        <BookmarkCheck className="w-5 h-5 text-[#c3e647]" />
                    ) : (
                        <Bookmark className="w-5 h-5 text-gray-200" />
                    )}
                </button>

                {/* Title Container with Glossy Effect */}
                <div className="absolute bottom-0 w-full p-4">
                    <div className="backdrop-blur-md bg-white/10 rounded-lg p-3 transition-transform duration-300 hover:translate-y-[-4px]">
                        <h3 className="text-lg font-semibold text-white line-clamp-2">
                            {movie.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-200">{movie.year}</span>
                            <span className="text-sm text-gray-200">•</span>
                            <span className="text-sm text-gray-200">★ {movie.imdbRating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard