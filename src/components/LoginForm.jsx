import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

export default function LoginForm({ onStart }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- STYLE OBJECTS (Supaya Rapi & Konsisten) ---
  const inputContainerStyle = {
    marginBottom: '1rem',
    position: 'relative',
    width: '100%'
  };

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)', // Trik jitu biar icon pas di tengah vertikal
    color: '#94a3b8',
    pointerEvents: 'none' // Agar icon tidak menghalangi klik input
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 45px', // Padding kiri 45px (DIJAMIN AMAN dari ikon)
    borderRadius: '0.5rem',
    border: 'none',
    boxSizing: 'border-box', // Penting agar padding tidak merusak lebar elemen
    outline: 'none',
    fontSize: '16px'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return setError('Isi semua data!');

    const db = JSON.parse(localStorage.getItem('quiz_users_db')) || {};

    if (isRegister) {
      if (db[username]) return setError('Username sudah dipakai!');
      db[username] = password;
      localStorage.setItem('quiz_users_db', JSON.stringify(db));
      alert('Berhasil daftar! Silakan login.');
      setIsRegister(false);
      setPassword('');
    } else {
      if (db[username] && db[username] === password) {
        onStart(username);
      } else {
        setError('Username/Password salah!');
      }
    }
  };

  return (
    <div className="glass-card">
      <h1 style={{textAlign:'center', marginBottom:'1.5rem', color: '#fff'}}>
        {isRegister ? 'Daftar Akun' : 'Login Quiz'}
      </h1>
      
      <form onSubmit={handleSubmit}>
        {/* INPUT USERNAME */}
        <div style={inputContainerStyle}>
            <User size={20} style={iconStyle}/>
            <input 
              style={inputStyle} 
              placeholder="Username" 
              value={username} 
              onChange={e=>setUsername(e.target.value)} 
            />
        </div>

        {/* INPUT PASSWORD */}
        <div style={inputContainerStyle}>
            <Lock size={20} style={iconStyle}/>
            <input 
              style={inputStyle} 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
            />
        </div>

        {error && <p style={{color:'#ff6b6b', textAlign:'center', marginBottom:'1rem', fontSize:'0.9rem'}}>{error}</p>}
        
        <button className="btn-primary" style={{
            width:'100%', 
            padding:'12px', 
            borderRadius:'0.5rem', 
            cursor:'pointer',
            fontWeight: 'bold',
            marginTop: '0.5rem'
        }}>
            {isRegister ? 'Daftar Sekarang' : 'Masuk'}
        </button>
      </form>

      <p style={{textAlign:'center', marginTop:'1.5rem', color:'#cbd5e1', cursor:'pointer', fontSize:'0.9rem'}} 
         onClick={() => {setIsRegister(!isRegister); setError('');}}>
         {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
         <span style={{textDecoration:'underline', color: '#fff'}}>{isRegister ? 'Login' : 'Daftar'}</span>
      </p>
    </div>
  );
}