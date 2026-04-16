import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if(!res.ok) {
        setError(data || "Login Failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/sample");
    
    } catch (err) {
      setError("Server Error", err.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0a0202] text-white font-sans overflow-x-hidden overflow-y-auto md:overflow-y-hidden">
      <main className="relative min-h-screen md:h-full flex flex-col">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#5a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#5a1a1a_1px,transparent_1px)] bg-size-[1rem_1rem]"></div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[linear-gradient(to_right,#7a2020_1px,transparent_1px),linear-gradient(to_bottom,#7a2020_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_0%,rgba(236,19,19,0.2),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(124,19,19,0.2),transparent_40%)]"></div>

        <div className="relative z-10 w-full">
          <header className="w-full px-5 md:px-8 pt-8 pb-6 border-y border-[#ec1313]/25 bg-[linear-gradient(120deg,rgba(26,9,9,0.95),rgba(46,12,12,0.74)_50%,rgba(21,8,8,0.95))] shadow-[0_10px_40px_rgba(0,0,0,0.4)] text-center">
            <h1 className="text-4xl md:text-6xl leading-none font-bold tracking-tight text-[#ec1313]">
              DEADLOCK_PROTOCOL
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-300 tracking-wide">
              Debug the Perfect Crime
            </p>
          </header>
        </div>

        <section className="relative z-10 flex-1 grid place-items-center px-5 md:px-8 py-4 md:py-5">
          <div className="w-full max-w-sm rounded-2xl border border-[#ec1313]/30 bg-[#130707]/85 backdrop-blur-sm p-5 md:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ec1313]/75 mb-3">Access Console</p>
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <p className="text-sm text-gray-400 mt-1">Re-enter the investigation and continue your case timeline.</p>

            <form className="mt-5 space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="detective@deadlock.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-[#0f0606] px-4 py-3 text-sm text-white outline-none focus:border-[#ec1313] transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                  className="w-full rounded-lg border border-gray-700 bg-[#0f0606] px-4 py-3 text-sm text-white outline-none focus:border-[#ec1313] transition"
                />
              </div>

              {error && ( 
                <p className="text-red-400 text-sm">{error}</p> 
              )}

              <button
                type="button"
                onClick={handleLogin}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#ec1313]/55 bg-[#ec1313] text-white text-sm font-bold hover:bg-red-600 transition shadow-[0_0_15px_rgba(236,19,19,0.35)]"
              >
                Enter Investigation
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between text-sm">
              <Link to="/" className="text-gray-400 hover:text-white transition">Back to Main Menu</Link>
              <Link to="/signup" className="text-[#fca5a5] hover:text-white transition">Create Account</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
