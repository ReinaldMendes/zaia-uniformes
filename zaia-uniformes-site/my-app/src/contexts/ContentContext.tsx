"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { contentAPI } from '@/utils/api'; // Importa apenas o que é necessário

interface Content {
  [key: string]: string;
}

interface ContentContextType {
  content: Content;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>({});
  const [isLoading, setIsLoading] = useState(true);

  // Função central para buscar o conteúdo da API
  const loadContent = useCallback(async () => {
    setIsLoading(true);
    try {
      // Usa a função 'getAll' do nosso contentAPI e acessa 'response.data'
      const response = await contentAPI.getAll();
      if (response.data && typeof response.data === 'object') {
        setContent(response.data);
        console.log("Content loaded successfully from API");
      } else {
        // Fallback em caso de resposta inesperada
        setContent({}); 
      }
    } catch (error) {
      console.error("Error loading content:", error);
      // Em caso de erro, você pode definir um conteúdo de fallback aqui se desejar
      setContent({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carrega o conteúdo na primeira vez que a aplicação monta
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <ContentContext.Provider value={{
      content,
      isLoading,
      refreshContent: loadContent // A função de refresh é a própria função de buscar
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}