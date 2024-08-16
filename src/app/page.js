'use client';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    fetchMovies(searchTerm);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie title..."
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded w-full">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border rounded overflow-hidden">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'} alt={movie.Title} className="w-full h-48 object-cover" />
            <div className="p-2">
              <h2 className="text-xl font-semibold">{movie.Title}</h2>
              <p className="text-gray-600">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
