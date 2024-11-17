// app/page.js
import React from 'react'
import Header from './components/header';
import FeaturedMovies from './components/featured-movies'
import Bookmark from './components/bookmark-movies'
import BrowseMovie from './components/browse-movie'

export default async function Home() {
  
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