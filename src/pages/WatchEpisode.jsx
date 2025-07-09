import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWatchData } from '../api';
import Spinner from '../components/Spinner';

export default function WatchEpisode() {
  const { slug: initialSlug } = useParams();
  const navigate = useNavigate();

  const [slug, setSlug] = useState(initialSlug);
  const [data, setData] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);

  // When initial URL changes (e.g., direct nav), update slug
  useEffect(() => {
    setSlug(initialSlug);
  }, [initialSlug]);
  useEffect(() => {
  document.title = `Watch ${slug.replace(/-/g, ' ')} | Dramacool`;
}, [slug]);
  // Fetch episode data
  useEffect(() => {
    if (!slug) return;
    setData(null); // reset
    getWatchData(slug).then((res) => {
      setData(res.data);
      setSelectedServer(res.data.servers?.[0]?.url || null);
    });
  }, [slug]);

if (!data) return <Spinner message="Loading episode..." />;

  return (
    
    <div className="bg-black min-h-screen text-white p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {slug.replace(/-/g, ' ')}
      </h1>

      {/* AD BLOCKER NOTE */}
<div className="bg-yellow-800/30 border-l-4 border-yellow-500 p-4 rounded-md mb-6">
  <p className="text-sm text-yellow-200">
    ⚠️ This player may show pop-up ads. For the best experience, we recommend using an ad blocker.
    <br />
    <a
      href="https://www.reddit.com/r/androidapps/comments/1e9o7hh/best_way_to_block_ads_and_trackers_on_your_device/"
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-blue-400 hover:text-blue-300"
    >
      Learn how to install ad blockers on all devices →
    </a>
  </p>
</div>

{/* ✅ Player loading info */}
<div className="bg-green-800/30 border-l-4 border-green-500 p-4 rounded-md mb-6">
  <p className="text-sm text-green-200">
    ✅ If the screen appears black, the player is still loading. Please wait 20–30 seconds — some servers are slow.
  </p>
</div>


      {/* Player */}
      <div className="aspect-video mb-6">
        <iframe
          src={selectedServer}
          allowFullScreen
          // sandbox="allow-same-origin allow-scripts allow-presentation"
          className="w-full h-full rounded-xl border border-gray-700"
        ></iframe>
      </div>

      {/* Server Switcher */}
      <h2 className="text-lg font-medium mb-2">Servers</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {data.servers.map((server, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedServer(server.url)}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedServer === server.url
                ? 'bg-blue-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {server.name}
          </button>
        ))}
      </div>

      {/* Episodes */}
      <h2 className="text-lg font-semibold mb-2">Episodes</h2>
      <div className="flex flex-wrap gap-2">
        {data.episodes.map((ep) => (
          <button
            key={ep.slug}
            onClick={() => {
              navigate(`/watch/${ep.slug}`);  // updates the URL
              setSlug(ep.slug);                // triggers fetch + iframe update
            }}
            className={`px-3 py-1 rounded-md text-sm ${
              ep.slug === slug ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {ep.title}
          </button>
        ))}
      </div>
    </div>
  );
}
