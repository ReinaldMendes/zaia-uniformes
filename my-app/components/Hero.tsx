"use client";

import { EditableText } from "./EditableText";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-zaia-dark-blue">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/img/hero-bg.jpg" 
          className="w-full h-full object-cover opacity-40 scale-110" 
          alt="Produção ZAIA"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zaia-dark-blue via-zaia-dark-blue/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl" data-aos="fade-right">
          {/* Badge */}
          <div className="inline-block px-4 py-1 border border-blue-400 text-blue-400 rounded-full text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">
            Ponta Grossa • PR
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-9xl text-white mb-8 leading-[1.1] font-bold">
            <EditableText
              contentKey="hero.title"
              fallback="Vista a Excelência."
              as="span"
            />
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-2xl mb-12 font-light max-w-2xl leading-relaxed">
            <EditableText
              contentKey="hero.subtitle"
              fallback="Conectamos a força da sua marca ao conforto e durabilidade que sua equipe merece. Alta costura corporativa direto da fábrica."
              type="textarea"
            />
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6">
            <a 
              href="#contato"
              className="px-12 py-6 bg-white text-[#1E3A5F] font-bold rounded-2xl shadow-2xl hover:bg-gray-100 transition-all text-lg"
            >
              <EditableText
                contentKey="hero.cta.primary"
                fallback="Solicitar Consultoria"
                as="span"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}