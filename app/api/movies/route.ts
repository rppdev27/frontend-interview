import { Movie } from '@/app/types'
import { NextResponse } from 'next/server'

// Define the API response type
interface ApiResponse {
  success: boolean;
  data: {
    default: Movie[];
  };
}

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(
      'https://menica-2024-api-express.vercel.app/movies?apikey=bitwyre2024FE',
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    // Validate the response structure
    if (!result.success || !result.data?.default) {
      return NextResponse.json(
        { error: 'Invalid response structure from external API' },
        { status: 500 }
      );
    }

    // Return the movies array wrapped in the expected structure
    return NextResponse.json({
      success: true,
      data: {
        default: result.data.default
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching movies:', errorMessage);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}