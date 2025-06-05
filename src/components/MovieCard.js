import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <button onClick={() => navigate(`/booking/${movie.imdbID}`)}>Забронювати</button>
    </div>
  );
};

export default MovieCard;
