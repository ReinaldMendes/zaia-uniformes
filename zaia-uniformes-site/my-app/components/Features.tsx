"use client";

import { Scissors, Palette, Truck } from "lucide-react";
import { EditableText } from "./EditableText";
import { useContent } from "@/contexts/ContentContext";

// Estrutura de dados para os itens, com ícones
const featureItems = [
  {
    icon: Scissors,
    titleKey: "features.item1.title",
    descKey: "features.item1.description",
    fallbackTitle: "Confecção Personalizada",
    fallbackDesc: "Produzimos uniformes sob medida para sua empresa, com cortes precisos e acabamentos profissionais que valorizam sua marca."
  },
  {
    icon: Palette,
    titleKey: "features.item2.title",
    descKey: "features.item2.description",
    fallbackTitle: "Design e Identidade Visual",
    fallbackDesc: "Criamos designs exclusivos que refletem a cultura e valores da sua empresa, fortalecendo a identidade corporativa."
  },
  {
    icon: Truck,
    titleKey: "features.item3.title",
    descKey: "features.item3.description",
    fallbackTitle: "Entrega e Suporte",
    fallbackDesc: "Garantimos entrega pontual e suporte contínuo, com manutenção e reposição de uniformes conforme necessário."
  }
];

export function Features() {
  const { content } = useContent();

  return (
    <section 
      id="quem-somos"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* IMAGEM DE FUNDO ADICIONADA AQUI */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: 'url(/img/background-pattern.png)' }}
      ></div>

      <div className="relative container mx-auto max-w-6xl px-6 z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-h2 text-white mb-4">
            <EditableText
              contentKey="features.title"
              fallback="Por que escolher a Zaia Uniformes"
              as="span"
            />
          </h2>
          <p className="text-body text-gray-300">
            <EditableText
              contentKey="features.intro"
              fallback="A Zaia Uniformes é especializada em confecção de uniformes profissionais para empresas de todos os portes, com foco em qualidade e personalização."
              type="textarea"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map(item => {
            const Icon = item.icon;
            if (!Icon) return null; 
            return (
              <div key={item.titleKey} className="text-center p-6">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon className="h-8 w-8 text-brand-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  <EditableText
                    contentKey={item.titleKey}
                    fallback={item.fallbackTitle}
                  />
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  <EditableText
                    contentKey={item.descKey}
                    fallback={item.fallbackDesc}
                    type="textarea"
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}