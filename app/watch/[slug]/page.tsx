'use client';

import { useEffect, useState } from 'react';
import { Movie } from '@/app/types';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface MovieApiResponse {
  success: boolean;
  data: Movie | null;
}

export default function WatchPage() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies/watch?id=${params.slug}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: MovieApiResponse = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error('Movie not found');
        }

        setMovie(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchMovie();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center px-4 py-2 mb-6 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </button>
          <div className="bg-gray-800 rounded-lg p-6">
            <h1 className="text-xl font-bold text-red-500 mb-2">Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center px-4 py-2 mb-6 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </button>
          <div className="bg-gray-800 rounded-lg p-6">
            <h1 className="text-xl font-bold mb-2">Movie Not Found</h1>
            <p>The requested movie could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center px-4 py-2 mb-6 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </button>

        <div className="bg-gray-800 rounded-lg p-6 pt-1">
            <div className="mb-4">
            {movie.videoSource && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Watch Movie</h2>
                    <div className="aspect-w-16 aspect-h-9">
                      <video
                        controls
                        className="w-full rounded-lg"
                        poster={movie.poster}
                      >
                        <source src={movie.videoSource} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
            </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img 
                src={movie.poster !== 'N/A' ? movie.poster : '/placeholder.jpg'} 
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Movie Info</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Year:</p>
                      <p>{movie.year}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Director:</p>
                      <p>{movie.director}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Runtime:</p>
                      <p>{movie.runtime}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Genre:</p>
                      <p>{movie.genre}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">IMDB Rating:</p>
                      <p>{movie.imdbRating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Views:</p>
                      <p>{movie.views.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Plot</h2>
                  <p className="text-gray-300">{movie.plot}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <p className="text-gray-300">{movie.actors}</p>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}