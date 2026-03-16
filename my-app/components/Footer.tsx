"use client";

import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import Link from 'next/link';
import { EditableText } from "./EditableText";

export function Footer() {
  return (
    <footer className="bg-zaia-dark-blue pt-24 pb-12 text-white relative">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-16">
        {/* Company Info */}
        <div className="col-span-2">
          <div className="flex items-center gap-6 mb-10">
            <img src="/img/logo.png" alt="ZAIA" className="h-24 md:h-32 rounded" />
            <span className="text-5xl font-black tracking-tighter">ZAIA</span>
          </div>
          <h4 className="text-3xl md:text-5xl font-light leading-tight mb-8">
            <EditableText
              contentKey="footer.slogan"
              fallback="Vestindo o Protagonismo da sua empresa."
              as="span"
            />
          </h4>
        </div>

        {/* Contact Info & Social */}
        <div className="md:text-right col-span-2 flex flex-col justify-center">
          <h5 className="font-bold uppercase tracking-widest text-sm text-blue-400 mb-6">
            Contatos Oficiais
          </h5>
          <p className="text-gray-400 text-xl italic mb-2">
            <EditableText
              contentKey="footer.contact.email"
              fallback="comercial@zaiauniformes.com.br"
              as="span"
            />
          </p>
          <p className="text-4xl md:text-6xl font-black">
            <EditableText
              contentKey="footer.contact.phone"
              fallback="(42) 98866-5220"
              as="span"
            />
          </p>
          
          {/* Social Links */}
          <div className="flex md:justify-end gap-10 mt-12 text-3xl">
            <a 
              href="https://www.instagram.com/zaiauniformes/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a 
              href="#" 
              className="hover:text-blue-400 transition"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-[10px] tracking-[0.5em] uppercase font-bold">
        <p>
          <EditableText
            contentKey="footer.copyright"
            fallback="© 2026 ZAIA UNIFORMES - PONTA GROSSA, PR - MADE WITH ELITE QUALITY."
            as="span"
          />
        </p>
      </div>

      {/* Floating Buttons */}
      <a 
        href="https://wa.me/5542988665220" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </footer>
  );
}