import { useEffect, useState } from 'react';

export default function LiveStatus({ flightNumber }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!flightNumber) return;
    let timer;
    async function fetchStatus() {
      try {
        const res = await fetch(`${baseUrl}/api/status/${flightNumber}`);
        const data = await res.json();
        setStatus(data);
      } catch (e) {
        // ignore
      }
    }
    fetchStatus();
    timer = setInterval(fetchStatus, 5000);
    return () => clearInterval(timer);
  }, [flightNumber]);

  if (!status) return null;
  return (
    <div className="text-xs text-white/70">Status: {status.status} • Gate {status.gate} • Updated {new Date(status.updated_at).toLocaleTimeString()}</div>
  );
}
