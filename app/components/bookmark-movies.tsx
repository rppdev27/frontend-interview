'use client'
import { useFavoritesStore } from '@/app/store'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import MovieCard from '@/app/components/movie-card'
import { Movie } from '../types'

// Define interfaces for props and state
interface ScrollState {
  showLeftButton: boolean
  showRightButton: boolean
}

interface ScrollDirection {
  direction: 'left' | 'right'
}

interface ScrollableElement extends HTMLDivElement {
  scrollLeft: number
  scrollWidth: number
  clientWidth: number
}

export default function FavoritesPage(): JSX.Element {
    // Updated store usage to match FavoritesState interface
    const favorites = useFavoritesStore((state) => state.favorites)
    const scrollContainerRef = useRef<ScrollableElement>(null)
    const [{ showLeftButton, showRightButton }, setScrollState] = useState<ScrollState>({
        showLeftButton: false,
        showRightButton: true
    })

    const handleScroll = (): void => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setScrollState({
                showLeftButton: scrollLeft > 0,
                showRightButton: scrollLeft < scrollWidth - clientWidth - 10
            })
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

    const scroll = ({ direction }: ScrollDirection): void => {
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
                        {showLeftButton && (
                            <button
                                onClick={() => scroll({ direction: 'left' })}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 
                                    bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200"
                                type="button"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                        )}
                        
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {favorites.map((movie: Movie, index: number) => (
                                <div key={`${movie.title}-${index}`} className="flex-none">
                                    <MovieCard movie={movie} />
                                </div>
                            ))}
                        </div>

                        {showRightButton && (
                            <button
                                onClick={() => scroll({ direction: 'right' })}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 
                                    bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-200"
                                type="button"
                                aria-label="Scroll right"
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