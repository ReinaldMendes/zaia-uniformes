"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EditableSection } from "@/components/EditableSection";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage"; // Vamos precisar dele
import { useAuth } from "@/contexts/AuthContext";
import { useEdit } from "@/contexts/EditContext";
import { useEffect } from 'react';

export default function CMSDemoPage() {
  const { login } = useAuth();
  const { setEditMode } = useEdit();

  // Simula um auto-login e ativa o modo de edição para a demonstração
  useEffect(() => {
    // Função auto-executável para simulação
    const runDemoSetup = async () => {
      // Usamos a função de login mockada do AuthContext se estiver em dev mode
      await login('demo@demo.com', 'demopass');
      
      // Ativa o modo de edição
      setEditMode(true);
    };

    runDemoSetup();

    // Ao sair da página, desativa o modo de edição
    return () => {
      setEditMode(false);
    };
  }, [login, setEditMode]);

  return (
    // 1. REMOVEMOS OS PROVIDERS DAQUI
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Usamos o Hero que já tornamos editável */}
        {/* <Hero /> ... ou qualquer outra seção */}
        
        <EditableSection 
          id="demo-section" 
          title="Seção de Demonstração"
          className="py-20 bg-gray-50"
        >
          <div className="container mx-auto max-w-4xl px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-brand-dark">
                {/* 2. CONTEÚDO AGORA É EDITÁVEL */}
                <EditableText
                  contentKey="cms_demo.title"
                  fallback="Sistema de Edição Inline em Ação"
                />
              </h2>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                <EditableText
                  contentKey="cms_demo.description"
                  fallback="Esta é uma demonstração do sistema CMS inline. Clique no botão 'Editar' na barra superior para começar a editar qualquer texto ou imagem desta página."
                  type="textarea"
                />
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-brand-dark mb-3">
                    <EditableText contentKey="cms_demo.feature1.title" fallback="Edição de Texto" />
                  </h3>
                  <p className="text-gray-600">
                    <EditableText contentKey="cms_demo.feature1.desc" fallback="Clique no ícone de lápis para editar títulos, parágrafos e outros textos diretamente na página." type="textarea" />
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                   <h3 className="text-xl font-semibold text-brand-dark mb-3">
                    <EditableText contentKey="cms_demo.feature2.title" fallback="Edição de Imagem" />
                  </h3>
                  <p className="text-gray-600">
                    <EditableText contentKey="cms_demo.feature2.desc" fallback="Passe o mouse sobre imagens para ver o botão de edição e fazer upload de novas imagens." type="textarea" />
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                   <h3 className="text-xl font-semibold text-brand-dark mb-3">
                    <EditableText contentKey="cms_demo.feature3.title" fallback="Controle de Seções" />
                  </h3>
                  <p className="text-gray-600">
                    <EditableText contentKey="cms_demo.feature3.desc" fallback="Use o menu de configurações das seções para reordenar, ocultar ou editar seções inteiras." type="textarea" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </EditableSection>
      </main>
      
      <Footer />
    </div>
  );
}