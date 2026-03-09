"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import { ScheduleModal } from "./ScheduleModal";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";
import { EditableSection } from "./EditableSection";
import { useContent } from "@/contexts/ContentContext";

export function Hero() {
  const { content } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <EditableSection 
      id="hero-section" 
      title="Seção Hero"
      className="relative min-h-screen bg-brand-magnetic-blue text-white overflow-hidden"
    >
      {/* Imagem de fundo transparente */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: 'url(/img/hero-image.png)' }}
      ></div>
      
      <div className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 z-10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="flex">
                <Badge className="bg-white/10 text-white border border-white/20 px-4 py-2 hover:bg-white/20 transition-colors">
                  <Star className="h-4 w-4 mr-2 fill-current" />
                  <EditableText 
                    contentKey="hero.badge"
                    fallback="#1 em Uniformes Profissionais"
                    as="span"
                  />
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-hero text-white leading-tight">
                  <EditableText 
                    contentKey="hero.title"
                    fallback="Uniformes Profissionais para sua Empresa"
                    type="textarea"
                    as="span"
                  />
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  <EditableText 
                    contentKey="hero.subtitle"
                    fallback="Qualidade, conforto e identidade visual para sua equipe. Uniformes personalizados para empresas, indústrias e profissionais."
                    type="textarea"
                  />
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-white" />
                  <div>
                    <span className="font-semibold text-white">
                      <EditableText contentKey="hero.stat1.number" fallback="500+" as="span" />
                    </span>
                    <span className="text-sm text-gray-300 ml-1">
                      <EditableText contentKey="hero.stat1.label" fallback="Empresas atendidas" as="span" />
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-white" />
                  <div>
                    <span className="font-semibold text-white">
                      <EditableText contentKey="hero.stat2.number" fallback="98%" as="span" />
                    </span>
                    <span className="text-sm text-gray-300 ml-1">
                      <EditableText contentKey="hero.stat2.label" fallback="Satisfação" as="span" />
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-brand-gradient hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <EditableText 
                    contentKey="hero.cta.primary"
                    fallback="Solicitar Orçamento"
                    isButtonChild={true}
                    as="span"
                  />
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  className="bg-white/20 text-white backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <EditableText 
                    contentKey="hero.cta.secondary"
                    fallback="Fale Conosco"
                    isButtonChild={true}
                    as="span"
                  />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-white/20">
                <p className="text-sm text-gray-300 mb-4">
                  <EditableText 
                    contentKey="hero.trust.title"
                    fallback="Confiado por empresas de diversos setores"
                  />
                </p>
                <div className="flex items-center space-x-6 opacity-70">
                  <span className="font-semibold text-gray-300">
                    <EditableText contentKey="hero.trust.partner1" fallback="Microsoft" as="span" />
                  </span>
                  <span className="font-semibold text-gray-300">
                    <EditableText contentKey="hero.trust.partner2" fallback="Google" as="span" />
                  </span>
                  <span className="font-semibold text-gray-300">
                    <EditableText contentKey="hero.trust.partner3" fallback="Amazon" as="span" />
                  </span>
                  <span className="font-semibold text-gray-300">
                    <EditableText contentKey="hero.trust.partner4" fallback="Apple" as="span" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative lg:pl-8">
              <div className="relative">
                <EditableImage
                  contentKey="hero.image"
                  fallback="/img/hero-image.png"
                  alt="Uniformes Profissionais Zaia"
                  width={1000}
                  height={800}
                  priority
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-brand-gradient rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">
                        <EditableText contentKey="hero.card.title" fallback="Qualidade Garantida" />
                      </p>
                      <p className="text-sm text-gray-600">
                        <EditableText contentKey="hero.card.subtitle" fallback="Tecidos premium e acabamento profissional" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScheduleModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </EditableSection>
  );
}