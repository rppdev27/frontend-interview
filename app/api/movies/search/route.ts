import { Movie } from '@/app/types'
import { NextResponse } from 'next/server'

interface SearchApiResponse {
  success: boolean;
  count: number;
  data: Movie[];
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get only title parameter from the URL
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    // Construct the search URL with only title parameter
    let searchUrl = 'https://menica-2024-api-express.vercel.app/movies/search?apikey=bitwyre2024FE';
    if (title) searchUrl += `&title=${encodeURIComponent(title)}`;

    const response = await fetch(searchUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: SearchApiResponse = await response.json();

    // Return the search results
    return NextResponse.json({
      success: result.success,
      count: result.count,
      data: result.data
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error searching movies:', errorMessage);
   
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}