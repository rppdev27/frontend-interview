// app/store/favorites-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Movie } from '@/app/types'

const initialFavorites: Movie[] = [
    {
        "title": "The Dark Knight",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        "genre": "Action, Crime, Drama",
        "director": "Christopher Nolan",
        "year": "2008",
        "runtime": "152 min",
        "actors": "Christian Bale, Heath Ledger, Aaron Eckhart",
        "plot": "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
        "views": 4735197,
        "likes": 167578,
        "imdbRating": "9.0",
        "Response": "True",
        "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
        "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
      },
      {
        "title": "Avatar",
        "poster": "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
        "genre": "Action, Adventure, Fantasy",
        "director": "James Cameron",
        "year": "2009",
        "runtime": "162 min",
        "actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver",
        "plot": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        "views": 9135613,
        "likes": 407821,
        "imdbRating": "7.9",
        "Response": "True",
        "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
        "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
      },
      {
        "title": "The Avengers",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg",
        "genre": "Action, Sci-Fi",
        "director": "Joss Whedon",
        "year": "2012",
        "runtime": "143 min",
        "actors": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
        "plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        "views": 9574957,
        "likes": 372535,
        "imdbRating": "8.0",
        "Response": "True",
        "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
        "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
      },
      {
        "title": "Frozen",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg",
        "genre": "Animation, Adventure, Comedy",
        "director": "Chris Buck, Jennifer Lee",
        "year": "2013",
        "runtime": "102 min",
        "actors": "Kristen Bell, Idina Menzel, Jonathan Groff",
        "plot": "Fearless optimist Anna teams up with rugged mountain man Kristoff and his loyal reindeer Sven in an epic journey to find Anna's sister Elsa, whose icy powers have trapped the kingdom of Arendelle in eternal winter.",
        "views": 9687555,
        "likes": 436019,
        "imdbRating": "7.4",
        "Response": "True",
        "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
        "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
      },
      {
        "title": "Inception",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        "genre": "Action, Adventure, Sci-Fi",
        "director": "Christopher Nolan",
        "year": "2010",
        "runtime": "148 min",
        "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
        "plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
        "views": 6766453,
        "likes": 304579,
        "imdbRating": "8.8",
        "Response": "True",
        "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
        "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
      },
      {
        "title": "Iron Man",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
        "genre": "Action, Adventure, Sci-Fi",
        "director": "Jon Favreau",
        "year": "2008",
        "runtime": "126 min",
        "actors": "Robert Downey Jr., Gwyneth Paltrow, Terrence Howard",
        "plot": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        "views": 5225125,
        "likes": 268868,
        "imdbRating": "7.9",
        "Response": "True",
        "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
        "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
      },
];


interface FavoritesState {
    favorites: Movie[]
    addFavorite: (movie: Movie) => void
    removeFavorite: (title: string) => void
    isFavorite: (title: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: initialFavorites,
            
            addFavorite: (movie: Movie) => {
                const state = get()
                if (!state.favorites.some(m => m.title === movie.title)) {
                    set({ favorites: [...state.favorites, movie] });
                }
            },
            
            removeFavorite: (title: string) =>
                set((state) => ({
                    favorites: state.favorites.filter((movie) => movie.title !== title)
                })),
            
            isFavorite: (title: string) => 
                get().favorites.some((movie) => movie.title === title),
        }),
        {
            name: 'movie-favorites-storage',
            // Initialize with default values if no stored data exists
            partialize: (state) => ({ favorites: state.favorites.length ? state.favorites : initialFavorites })
        }
    )
)