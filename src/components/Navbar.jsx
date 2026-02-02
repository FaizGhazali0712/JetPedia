import React, { useState } from "react";

const NAV_ITEMS = [
  { name: "Home", href: "#" },
  
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0f2540] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <a href="#" className="flex items-center space-x-3">
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="24" height="24" rx="6" fill="#ffffff" opacity="0.06" />
              <path d="M6 18L18 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6h.01M12 6h.01M18 6h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-semibold tracking-wide">Jetpedia</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-medium hover:text-gray-100 hover:underline transition"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-3">
              <button className="hidden sm:inline-flex items-center bg-white text-[#0f2540] px-4 py-2 rounded-md font-medium shadow-sm hover:opacity-95 transition">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-controls="mobile-menu"
              aria-expanded={open}
              className="p-2 inline-flex items-center justify-center rounded-md text-gray-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-max-height duration-300 ease-in-out ${open ? "max-h-screen" : "max-h-0 overflow-hidden"}`} id="mobile-menu">
        <div className="px-4 pb-4 pt-2 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5 transition"
            >
              {item.name}
            </a>
          ))}

          <div className="mt-2 px-1">
            <button className="w-full bg-white text-[#0f2540] px-4 py-2 rounded-md font-medium shadow-sm hover:opacity-95 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
