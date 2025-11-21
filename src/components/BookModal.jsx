import { useEffect, useState } from 'react';

export default function BookModal({ open, onClose, chosen }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(()=>{
    if (!open) { setName(''); setEmail(''); setStatus(''); setLoading(false);} 
  }, [open]);

  if (!open || !chosen) return null;
  const seg = chosen.segments[0];

  async function handleBook(){
    setLoading(true);
    setStatus('');
    try{
      const payload = {
        customer_name: name,
        customer_email: email,
        passengers: 1,
        origin: seg.origin,
        destination: seg.destination,
        date: seg.departure_time,
        flight_number: seg.flight_number,
        airline: seg.airline,
        price_total: chosen.price_total,
        segments: [seg]
      };
      const res = await fetch(`${baseUrl}/api/book`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.detail || 'Booking failed');
      setStatus(`Booked! Confirmation #${data.booking_id}`);
    }catch(e){
      setStatus(e.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg">
        <h3 className="text-white text-xl font-semibold">Passenger details</h3>
        <p className="text-white/70 text-sm mt-1">{seg.airline} • {seg.flight_number} • {seg.origin} → {seg.destination}</p>
        <div className="mt-4 space-y-3">
          <input className="w-full px-3 py-2 rounded-md bg-black/60 text-white outline-none border border-white/10" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full px-3 py-2 rounded-md bg-black/60 text-white outline-none border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="mt-4 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-white/20 text-white/80 hover:bg-white/5">Cancel</button>
          <button disabled={loading || !name || !email} onClick={handleBook} className="px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:from-orange-400 hover:to-yellow-300 transition">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
        {status && <p className="mt-3 text-orange-300 text-sm">{status}</p>}
      </div>
    </div>
  );
}
