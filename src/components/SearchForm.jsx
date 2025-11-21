import { useState } from 'react';

export default function SearchForm({ onResults }) {
  const [origin, setOrigin] = useState('SFO');
  const [destination, setDestination] = useState('JFK');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${baseUrl}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, date, passengers: Number(passengers) }),
      });
      if (!res.ok) throw new Error('Failed to fetch flights');
      const data = await res.json();
      onResults(data.results || []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="-mt-16 relative z-20 max-w-5xl mx-auto px-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4">
        <div className="flex flex-col">
          <label className="text-white/80 text-sm mb-1">From</label>
          <input value={origin} onChange={(e)=>setOrigin(e.target.value.toUpperCase())} className="px-3 py-2 rounded-md bg-black/60 text-white outline-none border border-white/10" placeholder="SFO" />
        </div>
        <div className="flex flex-col">
          <label className="text-white/80 text-sm mb-1">To</label>
          <input value={destination} onChange={(e)=>setDestination(e.target.value.toUpperCase())} className="px-3 py-2 rounded-md bg-black/60 text-white outline-none border border-white/10" placeholder="JFK" />
        </div>
        <div className="flex flex-col">
          <label className="text-white/80 text-sm mb-1">Date</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="px-3 py-2 rounded-md bg-black/60 text-white outline-none border border-white/10" />
        </div>
        <div className="flex flex-col">
          <label className="text-white/80 text-sm mb-1">Passengers</label>
          <input type="number" min="1" max="9" value={passengers} onChange={(e)=>setPassengers(e.target.value)} className="px-3 py-2 rounded-md bg-black/60 text-white outline-none border border-white/10" />
        </div>
        <div className="flex items-end">
          <button disabled={loading} className="w-full py-2 rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:from-orange-400 hover:to-yellow-300 transition">
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
