'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function MovieDetails() {
  const router = useRouter(); // para redirecionamento
  const { id } = useParams(); // Obtendo o id da URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${movieId}&plot=full`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("An error occurred while fetching movie details.");
    }

    setLoading(false);
  };

  const closeModal = () => {
    router.push('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
        <img src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'} alt={movie.Title} className="w-full h-64 object-cover mb-4" />
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Year:</strong> {movie.Year}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Genre:</strong> {movie.Genre}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Director:</strong> {movie.Director}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Actors:</strong> {movie.Actors}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Plot:</strong> {movie.Plot}</p>
      </div>
    </div>
  );
}
