'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDarkScheme) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const fetchMovies = async (query, type, year, page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${query}&type=${type}&y=${year}&page=${page}`
      );
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
    setPage(1);
    fetchMovies(searchTerm, type, year, 1);
  };

  const loadNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(searchTerm, type, year, nextPage);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Movie Search</h1>
        <button
          onClick={toggleTheme}
          className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white p-2 rounded"
        >
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </header>

      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie title..."
          className="border p-2 w-full rounded text-black"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 mt-2 w-full rounded text-black"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year of release"
          className="border p-2 mt-2 w-full rounded text-black"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded w-full">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link href={`/${movie.imdbID}`} key={movie.imdbID}>
            <div className="border rounded overflow-hidden cursor-pointer">
              <img src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'} alt={movie.Title} className="w-full h-48 object-cover" />
              <div className="p-2">
                <h2 className="text-xl font-semibold">{movie.Title}</h2>
                <p className="text-gray-600">{movie.Year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {movies.length > 0 && !loading && (
        <button
          onClick={loadNextPage}
          className="bg-blue-500 text-white p-2 mt-4 rounded w-full"
        >
          Load Next Page
        </button>
      )}
    </div>
  );
}
