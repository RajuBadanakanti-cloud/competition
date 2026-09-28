import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-sm">
            F
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Feedants
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/competitions" className={navLinkStyle}>
            Competitions
          </NavLink>

          <NavLink to="/my-competitions" className={navLinkStyle}>
            My Competitions
          </NavLink>

          <NavLink to="/profile" className={navLinkStyle}>
            Profile
          </NavLink>

        </div>

        {/* Desktop Action */}
        <div className="hidden md:block">
          <Link
            to="/competitions"
            className="rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-md"
          >
            Explore
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              <div className="rounded-xl px-4 py-3 hover:bg-slate-50">
                Home
              </div>
            </NavLink>

            <NavLink
              to="/competitions"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              <div className="rounded-xl px-4 py-3 hover:bg-slate-50">
                Competitions
              </div>
            </NavLink>

            <NavLink
              to="/my-competitions"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              <div className="rounded-xl px-4 py-3 hover:bg-slate-50">
                My Competitions
              </div>
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className={navLinkStyle}
            >
              <div className="rounded-xl px-4 py-3 hover:bg-slate-50">
                Profile
              </div>
            </NavLink>

            <Link
              to="/competitions"
              onClick={() => setIsOpen(false)}
              className="mt-2 block rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-3 text-center font-semibold text-white"
            >
              Explore Competitions
            </Link>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;