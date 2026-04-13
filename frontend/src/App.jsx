import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Sandbox from './pages/Sandbox';
import SamplePage from './pages/SamplePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// A temporary Main Menu to test navigation
function MainMenu() {
  return (
    <div className="h-screen w-screen bg-[#0a0202] flex flex-col items-center justify-center font-sans px-4">
      <h1 className="text-4xl text-[#ec1313] font-bold mb-8 tracking-tight text-center">DEADLOCK_PROTOCOL</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          to="/home" 
          className="px-6 py-3 bg-[#241111] border border-[#ec1313] text-white rounded hover:bg-[#ec1313] transition"
        >
          Go to Homepage
        </Link>
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
        <Link 
          to="/login" 
          className="px-6 py-3 bg-[#1a0b0b] border border-gray-600 text-gray-300 rounded hover:text-white hover:border-[#ec1313] transition"
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className="px-6 py-3 bg-[#ec1313]/15 border border-[#ec1313]/60 text-[#fca5a5] rounded hover:bg-[#ec1313] hover:text-white transition"
        >
          Signup
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
        <Route path="/home" element={<HomePage />} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}