import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getDramaDetails } from '../api';
import Spinner from '../components/Spinner';

export default function DramaDetails() {
  const location = useLocation();
  const fullSlug = location.pathname.replace('/drama/', '');
  const cleanedSlug = fullSlug.replace(/^series\//, '');

  const [drama, setDrama] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Set dynamic <title>
  useEffect(() => {
    if (drama?.data?.title) {
      document.title = `${drama.data.title} – Details | Dramacool`;
    } else {
      document.title = 'Drama Not Found | Dramacool';
    }
  }, [drama]);

  // ✅ Fetch drama details
  useEffect(() => {
    async function fetchDrama() {
      try {
        console.log('🔍 Fetching details for:', cleanedSlug);
        const data = await getDramaDetails(cleanedSlug);
        console.log('✅ Drama data:', data);
        setDrama(data);
      } catch (err) {
        console.error('❌ Error fetching drama details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDrama();
  }, [cleanedSlug]);

  // ✅ Show loading spinner
  if (loading) return <Spinner message="Loading drama details..." />;

  // ✅ Handle error / no data
  if (!drama || (!drama.data?.title)) {
    return (
      <div className="text-red-500 bg-black min-h-screen p-6">
        Drama not found or incomplete data.
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      {/* Poster + Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={drama.data.poster}
          alt={drama.data.title || 'Poster'}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">
            {drama.data.title || 'Untitled Drama'}
          </h1>
          <p className="text-gray-300 mb-4">
            {drama.data.description || 'No description available.'}
          </p>

          {drama.data.trailer && (
            <div className="aspect-video mb-4">
              <iframe
                src={drama.data.trailer}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title="Trailer"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Episodes */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
        {drama.data.episodes?.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {drama.data.episodes.map((ep) => (
              <li key={ep.slug}>
                <Link
                  to={`/watch/${ep.slug}`}
                  className="block px-4 py-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition text-sm"
                >
                  {ep.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No episodes available.</p>
        )}
      </div>
    </div>
  );
}
