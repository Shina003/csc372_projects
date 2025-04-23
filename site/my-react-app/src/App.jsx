// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
//import { SuccessStories } from './pages/SuccessStories';
//import { Goals } from './pages/Goals';
import { Members } from './pages/Members';
//import { Events } from './pages/Events';
import { Contact } from './pages/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF', 
        color: '#000000',  
        fontFamily: "'Boldonse', sans-serif",
        fontWeight: 'bold',
        overflow: 'hidden'
      }}>
        <Navigation />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;