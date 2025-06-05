import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

const API_KEY = 'a101a0c6';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Avengers');

  const fetchMovies = async (query) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();
    if (data.Search) setMovies(data.Search);
    else setMovies([]);
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="container">
      <h1>🎬 Movie Explorer</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
