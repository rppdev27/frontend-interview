import { Movie } from '@/app/types'
import { NextResponse } from 'next/server'

interface MovieApiResponse {
  success: boolean;
  data: Movie | null;
}

export async function GET(
  request: Request,
): Promise<NextResponse> {
  try {
    // Get the ID from search params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    console.log(id);

    // Validate if ID is a number
    const movieId = parseInt(id || '');
    console.log(movieId);
    if (isNaN(movieId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid ID format. ID must be a number',
          data: null
        },
        { status: 400 }
      );
    }

    // Construct the URL for the movie search by ID
    const searchUrl = `https://menica-2024-api-express.vercel.app/movies/${movieId}?apikey=bitwyre2024FE`;

    // Fetch the movie data
    const response = await fetch(searchUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle non-200 responses
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          {
            success: false,
            message: `No movie found with ID: ${movieId}`,
            data: null
          },
          { status: 404 }
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response
    const result: MovieApiResponse = await response.json();

    // Return the movie data
    return NextResponse.json({
      success: result.success,
      data: result.data
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching movie by ID:', errorMessage);
   
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: errorMessage
      },
      { status: 500 }
    );
  }
}