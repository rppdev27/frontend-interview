// app/page.js
import React from 'react'
import Header from '../components/header';
import FeaturedMovies from '../components/featured-movies'
import Bookmark from '../components/bookmark-movies'
import BrowseMovie from '../components/browse-movie'
// Mark the component as async
async function getMovies() {
  try {
    const response = await fetch('http://localhost:3001/api/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache options if needed
      next: {
        revalidate: 3600 // revalidate every hour
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return []; // Return empty array as fallback
  }
}

export default async function Home() {

  const movies = await getMovies();

  console.log(movies);
  
  return (
    <main>
      {/* Header */}
      <Header />
      
      {/* Featured Movies */}
      <FeaturedMovies />
      
      {/* Your Favourite or Bookmark */}
      <Bookmark />

      {/* Browser Movie */}
      <BrowseMovie/>

      {/* Footer */}
    </main>
  )
}