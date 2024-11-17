'use client'
import { useFavoritesStore } from '@/app/store'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import MovieCard from '@/app/components/movie-card'

export default function FavoritesPage() {
    const { favorites } = useFavoritesStore()
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [showLeftButton, setShowLeftButton] = useState(false)
    const [showRightButton, setShowRightButton] = useState(true)

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setShowLeftButton(scrollLeft > 0)
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll)
            handleScroll() // Initial check
            return () => scrollContainer.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div
            className="relative flex justify-center align-middle items-center py-3 px-3 md:px-16 md:py-10 
                dark:bg-dark-bg text-white z-40 min-h-[400px] flex-col"
            style={{
                fontFamily: 'Jost'
            }}
        >
            <div className="w-[79%]">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 dark:bg-[#c3e647] bg-slate-900"></div>
                    <span className="uppercase font-bold tracking-wider text-lg md:text-xl dark:text-white text-[#252424]">
                        Your Favourite
                    </span>
                </div>
                {favorites.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[400px] dark:text-white text-[#252424]">
                        <p className="text-gray-500">No favorite movies yet</p>
                    </div>
                ) : (
                    <div className="relative group">
                        {/* Left scroll button */}
                        {showLeftButton && (
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 
                                    bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                        )}
                        
                        {/* Scrollable container */}
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {favorites.map((movie, index) => (
                                <div key={`${movie.title}-${index}`} className="flex-none">
                                    <MovieCard movie={movie} key={index}/>
                                </div>
                            ))}
                        </div>

                        {/* Right scroll button */}
                        {showRightButton && (
                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 
                                    bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}