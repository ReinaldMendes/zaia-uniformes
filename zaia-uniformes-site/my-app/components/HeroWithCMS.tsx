"use client";

import { useState } from 'react';
import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";
import { EditableImage } from "./EditableImage";
import { EditableText } from "./EditableText";
import { ScheduleModal } from './ScheduleModal';

export function Hero() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-light to-white py-20 lg:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in-up">
              <h1 className="text-hero text-brand-dark mb-6">
                <EditableText
                  contentKey="hero.title"
                  fallback="Soluções contábeis automatizadas para sua empresa crescer"
                  as="span"
                />
              </h1>
              
              <p className="text-body text-gray-600 mb-8 max-w-lg">
                <EditableText
                  contentKey="hero.description"
                  fallback="Automatize sua contabilidade com tecnologia de ponta. Mais tempo para focar no que realmente importa: o crescimento do seu negócio."
                  type="textarea"
                />
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brand-gradient hover:opacity-90 group"
                  onClick={() => setIsScheduleModalOpen(true)}
                >
                  <EditableText
                    contentKey="hero.cta.primary"
                    fallback="Agende uma demo"
                    as="span"
                    isButtonChild={true}
                  />
                  <Play className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white group"
                  onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <EditableText
                    contentKey="hero.cta.secondary"
                    fallback="Ver planos"
                    as="span"
                    isButtonChild={true}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-semibold text-brand-teal">
                    <EditableText
                      contentKey="hero.stats.companies.number"
                      fallback="500+"
                      as="span"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <EditableText
                      contentKey="hero.stats.companies.label"
                      fallback="Empresas atendidas"
                      as="span"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-brand-teal">
                    <EditableText
                      contentKey="hero.stats.satisfaction.number"
                      fallback="98%"
                      as="span"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <EditableText
                      contentKey="hero.stats.satisfaction.label"
                      fallback="Satisfação"
                      as="span"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-brand-teal">
                    <EditableText
                      contentKey="hero.stats.support.number"
                      fallback="24h"
                      as="span"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <EditableText
                      contentKey="hero.stats.support.label"
                      fallback="Suporte"
                      as="span"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <EditableImage
                  contentKey="hero.image"
                  fallback="/img/hero-image.png"
                  alt="Equipe ContabilizeTech trabalhando com tecnologia"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  width={600}
                  height={400}
                />
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-brand-gradient opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-accent opacity-10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <ScheduleModal 
        open={isScheduleModalOpen} 
        onOpenChange={setIsScheduleModalOpen} 
      />
    </>
  );
}