import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Sandbox from './pages/Sandbox';
import SamplePage from './pages/SamplePage';

// A temporary Main Menu to test navigation
function MainMenu() {
  return (
    <div className="h-screen w-screen bg-[#0a0202] flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl text-[#ec1313] font-bold mb-8">DEADLOCK PROTOCOL</h1>
      <div className="flex gap-4">
        <Link 
          to="/sample" 
          className="px-6 py-3 bg-[#2a1515] border border-[#ec1313] text-white rounded hover:bg-[#ec1313] transition"
        >
          Go to Sample Page
        </Link>
        <Link 
          to="/sandbox" 
          className="px-6 py-3 bg-[#110808] border border-gray-700 text-gray-400 rounded hover:text-white transition"
        >
          Go to Sandbox
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/sandbox" element={<Sandbox />} />
      </Routes>
    </BrowserRouter>
  );
}