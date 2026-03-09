"use client";

import { Link } from "react-router-dom";

export function SimpleHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center">
              <span className="text-white font-bold">CT</span>
            </div>
            <span className="text-xl font-semibold text-brand-dark">
              Contabilize<span className="text-brand-teal">Tech</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-brand-teal transition-colors">
              Serviços
            </a>
            <a href="#about" className="text-gray-700 hover:text-brand-teal transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-gray-700 hover:text-brand-teal transition-colors">
              Contato
            </a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/admin/login"
              className="text-brand-dark hover:text-brand-teal transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/cms-demo"
              className="bg-brand-gradient text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}