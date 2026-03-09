"use client";

import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ScheduleModal } from "./ScheduleModal";
import Link from 'next/link';
import { useContent } from "@/contexts/ContentContext";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";

export function Header() {
  const { content } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Estrutura de dados para os links do menu, buscando do ContentContext
  const navLinks = [
    { 
      textKey: 'header.menu.item1.text', 
      href: content['header.menu.item1.href'] || '#services',
      fallback: 'Serviços'
    },
    { 
      textKey: 'header.menu.item2.text', 
      href: content['header.menu.item2.href'] || '#quem-somos',
      fallback: 'Quem Somos'
    },
    { 
      textKey: 'header.menu.item3.text', 
      href: content['header.menu.item3.href'] || '#contact',
      fallback: 'Contato'
    },
  ];

  // Função para lidar com o scroll suave e fechar o menu mobile
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Fecha o menu mobile após o clique
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" aria-label="Página Inicial">
            <EditableImage
              contentKey="header.logo"
              fallback="/img/contabilizetech_logo.png"
              alt="Zaia Uniformes Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-semibold text-brand-dark">
              Zaia <span className="text-brand-teal">Uniformes</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.textKey}
                href={link.href} 
                className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors cursor-pointer"
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                <EditableText contentKey={link.textKey} fallback={link.fallback} as="span" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin/login">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-brand-dark hover:text-brand-teal hover:bg-brand-teal/5 transition-all duration-300"
              >
                Login
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="bg-brand-gradient hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              <EditableText 
                contentKey="header.cta.demo" 
                fallback="Solicitar Orçamento" 
                as="span" 
                isButtonChild={true}
              />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-brand-dark" />
            ) : (
              <Menu className="h-6 w-6 text-brand-dark" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <a 
                  key={link.textKey}
                  href={link.href} 
                  className="text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors cursor-pointer"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  <EditableText contentKey={link.textKey} fallback={link.fallback} as="span" />
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link href="/admin/login">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start text-brand-dark hover:text-brand-teal hover:bg-brand-teal/5 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  className="bg-brand-gradient hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    setIsScheduleModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Agende uma demo
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      <ScheduleModal 
        open={isScheduleModalOpen} 
        onOpenChange={setIsScheduleModalOpen} 
      />
    </header>
  );
}