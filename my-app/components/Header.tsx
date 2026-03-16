"use client";

import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';
import { Lock } from "lucide-react";
import { EditableText } from "./EditableText";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '#inicio', contentKey: 'nav.home' },
    { label: 'Serviços', href: '#servicos', contentKey: 'nav.services' },
    { label: 'Portfólio', href: '#portfolio', contentKey: 'nav.portfolio' },
    { label: 'Contato', href: '#contato', contentKey: 'nav.contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-40 transition-all duration-500" id="main-header">
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <img 
              src="/img/logo.png" 
              alt="Logo ZAIA" 
              className="h-16 md:h-20 w-auto rounded shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-zaia-primary leading-none">ZAIA</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Uniformes</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-[12px] font-bold uppercase tracking-widest text-gray-700">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="hover:text-zaia-primary transition"
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                <EditableText
                  contentKey={link.contentKey}
                  fallback={link.label}
                  as="span"
                />
              </a>
            ))}
            <a 
              href="#contato"
              className="bg-[#1E3A5F] text-white px-8 py-4 rounded-full hover:bg-[#2F5F8F] transition shadow-lg active:scale-95 font-bold"
              onClick={(e) => handleSmoothScroll(e, '#contato')}
            >
              <EditableText
                contentKey="nav.cta"
                fallback="Orçamento"
                as="span"
              />
            </a>
            <Link
              href="/admin/login"
              className="bg-zaia-accent text-zaia-primary px-6 py-3 rounded-full hover:bg-[#c4a038] transition shadow-lg active:scale-95 font-bold flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-zaia-primary text-2xl" 
            id="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" id="mobile-menu">
              <div className="bg-white w-80 h-full p-8">
                <div className="flex justify-between items-center mb-12">
                  <img src="/img/logo.png" alt="ZAIA" className="h-12 rounded" />
                  <button 
                    className="text-2xl text-gray-600" 
                    id="close-mobile-menu"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex flex-col gap-8 text-lg font-bold uppercase tracking-widest text-gray-700">
                  {navLinks.map((link) => (
                    <a 
                      key={link.href}
                      href={link.href} 
                      className="hover:text-zaia-primary transition"
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                    >
                      <EditableText
                        contentKey={link.contentKey}
                        fallback={link.label}
                        as="span"
                      />
                    </a>
                  ))}
                  <a 
                    href="#contato"
                    className="bg-[#1E3A5F] text-white px-6 py-3 rounded-full text-center hover:bg-[#2F5F8F] transition font-bold"
                    onClick={(e) => handleSmoothScroll(e, '#contato')}
                  >
                    <EditableText
                      contentKey="nav.cta"
                      fallback="Orçamento"
                      as="span"
                    />
                  </a>
                  <Link 
                    href="/admin/login" 
                    className="bg-zaia-accent text-zaia-primary px-6 py-3 rounded-full text-center hover:bg-[#c4a038] transition font-bold flex items-center gap-2 justify-center"
                  >
                    <Lock className="w-4 h-4" />
                    Admin
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}