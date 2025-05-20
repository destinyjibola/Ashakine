import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="mb-4">This is the main application page.</p>
        <Link 
          href="/admin" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
}