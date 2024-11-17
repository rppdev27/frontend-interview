// app/store/favorites-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Movie } from '@/app/types'

const initialFavorites: Movie[] = [
  {
    "id": 1,
    "title": "X-Men: Days of Future Past",
    "poster": "https://m.media-amazon.com/images/M/MV5BNzNiYWE4NjMtMTU4OS00NmM4LWE4ZjAtYmE5OTA5NjkzODExXkEyXkFqcGc@._V1_SX300.jpg",
    "genre": "Action, Adventure, Sci-Fi",
    "director": "Bryan Singer",
    "year": "2014",
    "runtime": "132 min",
    "actors": "Patrick Stewart, Ian McKellen, Hugh Jackman",
    "plot": "The X-Men send Wolverine to the past in a desperate effort to change history and prevent an event that results in doom for both humans and mutants.",
    "views": 8618325,
    "likes": 571437,
    "imdbRating": "7.9",
    "Response": "True",
    "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
    "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    "id": 2,
    "title": "No Time to Die",
    "poster": "https://m.media-amazon.com/images/M/MV5BZGZiOGZhZDQtZmRkNy00ZmUzLTliMGEtZGU0NjExOGMxZDVkXkEyXkFqcGc@._V1_SX300.jpg",
    "genre": "Action, Adventure, Thriller",
    "director": "Cary Joji Fukunaga",
    "year": "2021",
    "runtime": "163 min",
    "actors": "Daniel Craig, Ana de Armas, Rami Malek",
    "plot": "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
    "views": 3878436,
    "likes": 237069,
    "imdbRating": "7.3",
    "Response": "True",
    "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
    "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    "id": 3,
    "title": "Django Unchained",
    "poster": "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg",
    "genre": "Comedy, Drama, Western",
    "director": "Quentin Tarantino",
    "year": "2012",
    "runtime": "165 min",
    "actors": "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio",
    "plot": "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.",
    "views": 4752261,
    "likes": 364354,
    "imdbRating": "8.5",
    "Response": "True",
    "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
    "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    "id": 4,
    "title": "Avatar",
    "poster": "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg",
    "genre": "Action, Adventure, Fantasy",
    "director": "James Cameron",
    "year": "2009",
    "runtime": "162 min",
    "actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver",
    "plot": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "views": 6205991,
    "likes": 562569,
    "imdbRating": "7.9",
    "Response": "True",
    "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
    "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    "id": 5,
    "title": "The Dark Knight",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    "genre": "Action, Crime, Drama",
    "director": "Christopher Nolan",
    "year": "2008",
    "runtime": "152 min",
    "actors": "Christian Bale, Heath Ledger, Aaron Eckhart",
    "plot": "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
    "views": 7931092,
    "likes": 100362,
    "imdbRating": "9.0",
    "Response": "True",
    "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
    "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    "id": 6,
    "title": "The Prestige",
    "poster": "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg",
    "genre": "Drama, Mystery, Sci-Fi",
    "director": "Christopher Nolan",
    "year": "2006",
    "runtime": "130 min",
    "actors": "Christian Bale, Hugh Jackman, Scarlett Johansson",
    "plot": "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    "views": 6662443,
    "likes": 418357,
    "imdbRating": "8.5",
    "Response": "True",
    "videoSource": "https://videos.pexels.com/video-files/3194277/3194277-hd_1920_1080_30fps.mp4",
    "videoYoutube": "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    "id": 7,
    "title": "Iron Man",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
    "genre": "Action, Adventure, Sci-Fi",
    "director": "Jon Favreau",
    "year": "2008",
    "runtime": "126 min",
    "actors": "Robert Downey Jr., Gwyneth Paltrow, Terrence Howard",
    "plot": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    "views": 6278080,
    "likes": 117333,
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