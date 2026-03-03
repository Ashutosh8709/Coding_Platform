import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
  const { dark, setDark } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const navLinks = [
    { label: "Problems", to: "/problems" },
    { label: "Courses", to: "/courses" },
    { label: "Contests", to: "/contests" },
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "Discuss", to: "/discuss" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-dark-900/85 backdrop-blur-xl border-b border-gray-200 dark:border-dark-500"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* ── Logo ── */}
      <Link
        to={user ? "/problems" : "/"}
        className="flex items-center gap-2 flex-shrink-0"
      >
        <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-glow-sm">
          <span className="text-white text-xs font-black">CF</span>
        </div>
        <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
          Code<span className="text-brand-500">Forge</span>
        </span>
      </Link>

      {/* ── Center nav links (only when logged in) ── */}
      <div className="flex items-center gap-1 mx-auto">
        {user &&
          navLinks.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive(n.to)
                  ? "text-brand-500 bg-brand-500/10"
                  : "text-gray-500 dark:text-dark-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-600"
              }`}
            >
              {n.label}
            </Link>
          ))}
      </div>

      {/* ── Right side ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Theme toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base border border-gray-200 dark:border-dark-500 bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-all"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {user ? (
          /* ── Logged-in: profile dropdown ── */
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-dark-500 hover:bg-gray-50 dark:hover:bg-dark-700 transition-all group"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm shadow-glow-sm flex-shrink-0">
                {user.avatar}
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-white hidden sm:block">
                {user.name}
              </span>
              {/* Chevron */}
              <svg
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 hidden sm:block ${profileOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 shadow-xl dark:shadow-black/50 overflow-hidden animate-scale-in origin-top-right">
                {/* User info header */}
                <div className="px-4 py-3.5 border-b border-gray-100 dark:border-dark-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold shadow-glow-sm flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-dark-300 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                  {[
                    { label: "Dashboard", to: "/dashboard", icon: "▦" },
                    { label: "My Profile", to: "/profile", icon: "👤" },
                    { label: "Submissions", to: "/submissions", icon: "📋" },
                    { label: "Settings", to: "/settings", icon: "⚙️" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-brand-500/8 hover:text-brand-500 transition-all group"
                    >
                      <span className="text-base w-5 flex-shrink-0">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Divider + logout */}
                <div className="p-1.5 border-t border-gray-100 dark:border-dark-600">
                  <button
                    onClick={() => {
                      logoutUser();
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 dark:text-dark-300 hover:bg-red-500/8 hover:text-red-500 transition-all"
                  >
                    <span className="text-base w-5 flex-shrink-0">🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── Logged-out: sign in + sign up ── */
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm px-4 py-1.5 rounded-lg border border-gray-200 dark:border-dark-500 text-gray-600 dark:text-dark-300 hover:border-brand-500 hover:text-brand-500 transition-all font-medium"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-sm px-4 py-1.5 rounded-lg gradient-brand text-white font-bold hover:shadow-glow-md hover:-translate-y-px transition-all"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
