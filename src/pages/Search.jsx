import { useState, useEffect } from 'react';
import { searchContent } from '../api';
import DramaCard from '../components/DramaCard';
import Spinner from '../components/Spinner';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // To know if a search was done

  // ✅ Set page title
  useEffect(() => {
    document.title = 'Search – Dramacool';
  }, []);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await searchContent(trimmedQuery);
      setResults(res.data || []);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Allow Enter key to trigger search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search dramas, movies, or kshows..."
          className="w-full p-2 bg-gray-700 rounded focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <Spinner message="Searching..." />
      ) : searched && results.length === 0 ? (
        <p className="text-gray-400">No results found for "{query}"</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {results.map((item, idx) => (
            <DramaCard key={idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
