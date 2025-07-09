import { Link } from 'react-router-dom';

export default function DramaCard({ item, episodeLink = false }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition">
      <img src={item.thumbnail || item.poster} alt={item.title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        {item.episode && <p className="text-sm text-gray-400">{item.episode}</p>}
        <Link 
          to={episodeLink ? `/watch/${item.slug}` : `/drama/${item.slug}`} 
          className="block mt-2 text-blue-400 text-sm underline"
        >
          {episodeLink ? 'Watch Episode' : 'View Details'}
        </Link>
      </div>
    </div>
  );
}