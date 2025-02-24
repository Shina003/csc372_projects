// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { SuccessStories } from './pages/SuccessStories';
import { Goals } from './pages/Goals';
import { Members } from './pages/Members';
import { Events } from './pages/Events';
import { Contact } from './pages/Contact';  // Add this import
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#808080'
      }}>
        <Navigation />
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/members" element={<Members />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />  {/* Update this route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;