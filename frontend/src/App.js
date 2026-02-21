import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:8080/api/trades';

function App() {
  const [trades, setTrades] = useState([]);
  const [form, setForm] = useState({
    instrument: '', side: 'BUY', quantity: '', price: '', trader: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = () => {
    fetch(API)
      .then(r => r.json())
      .then(data => setTrades(data))
      .catch(() => setMessage('Could not connect to API'));
  };

  const handleSubmit = () => {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        quantity: parseInt(form.quantity),
        price: parseFloat(form.price)
      })
    })
      .then(r => r.json())
      .then(() => {
        setMessage('Trade submitted');
        setForm({ instrument: '', side: 'BUY', quantity: '', price: '', trader: '' });
        fetchTrades();
      })
      .catch(() => setMessage('Submit failed'));
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#1F3864', borderBottom: '2px solid #1F3864', paddingBottom: 8 }}>
        Equities Trade Blotter
      </h1>

      {/* Submit Form */}
      <div style={{ background: '#f5f7fa', padding: 20, borderRadius: 6, marginBottom: 30 }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>Submit Trade</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['instrument', 'quantity', 'price', 'trader'].map(field => (
            <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc', width: 140 }}
            />
          ))}
          <select value={form.side} onChange={e => setForm({ ...form, side: e.target.value })}
            style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc' }}>
            <option>BUY</option>
            <option>SELL</option>
          </select>
          <button onClick={handleSubmit}
            style={{ padding: '8px 20px', background: '#1F3864', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            Submit
          </button>
        </div>
        {message && <p style={{ color: '#1F3864', marginTop: 10 }}>{message}</p>}
      </div>

      {/* Trade Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1F3864', color: 'white' }}>
            {['ID', 'Instrument', 'Side', 'Quantity', 'Price', 'Trader', 'Timestamp'].map(h => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 13 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trades.map((t, i) => (
            <tr key={t.id} style={{ background: i % 2 === 0 ? '#fff' : '#f5f7fa' }}>
              <td style={{ padding: '8px 12px', fontSize: 13 }}>{t.id}</td>
              <td style={{ padding: '8px 12px', fontSize: 13, fontWeight: 'bold' }}>{t.instrument}</td>
              <td style={{ padding: '8px 12px', fontSize: 13, color: t.side === 'BUY' ? 'green' : 'red', fontWeight: 'bold' }}>{t.side}</td>
              <td style={{ padding: '8px 12px', fontSize: 13 }}>{t.quantity.toLocaleString()}</td>
              <td style={{ padding: '8px 12px', fontSize: 13 }}>{t.price}</td>
              <td style={{ padding: '8px 12px', fontSize: 13 }}>{t.trader}</td>
              <td style={{ padding: '8px 12px', fontSize: 13, color: '#888' }}>{new Date(t.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {trades.length === 0 && <p style={{ color: '#888', textAlign: 'center' }}>No trades yet</p>}
    </div>
  );
}

export default App;