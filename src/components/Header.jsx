import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-blue-400">Dramacool</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link>
      </nav>
    </header>
  );
}