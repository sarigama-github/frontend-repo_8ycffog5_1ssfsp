import { useState } from 'react';

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function FlightCard({ result, onSelect }) {
  const seg = result.segments[0];
  const hours = Math.floor(seg.duration_minutes/60);
  const mins = seg.duration_minutes%60;
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
      <div className="flex items-center justify-between">
        <div className="text-white">
          <div className="text-sm text-white/70">{seg.airline} • {seg.flight_number}</div>
          <div className="text-xl font-semibold">{seg.origin} → {seg.destination}</div>
          <div className="text-white/80 text-sm">{formatTime(seg.departure_time)} - {formatTime(seg.arrival_time)} • {hours}h {mins}m • {seg.status}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-300">${result.price_total}</div>
          <button onClick={()=>onSelect(result)} className="mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:from-orange-400 hover:to-yellow-300 transition">Book</button>
        </div>
      </div>
    </div>
  );
}

export default function Results({ results, onSelect }) {
  if (!results.length) return null;
  return (
    <div className="max-w-5xl mx-auto px-6 mt-6 space-y-4">
      {results.map((r, i) => (
        <FlightCard key={i} result={r} onSelect={onSelect} />
      ))}
    </div>
  );
}
