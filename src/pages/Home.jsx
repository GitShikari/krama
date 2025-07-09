import { useEffect, useState } from 'react';
import { fetchRecent } from '../api';
import DramaCard from '../components/DramaCard';

export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
  document.title = 'Dramacool – Watch Asian Dramas & Movies Online';
}, []);

  useEffect(() => {
    fetchRecent().then(res => setItems(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item, idx) => <DramaCard key={idx} item={item} episodeLink />)}
    </div>
  );
}
