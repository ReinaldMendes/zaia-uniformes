"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useContent } from './ContentContext';
import { api } from '@/utils/api';
import { toast } from 'sonner';

// Interface para guardar as alterações pendentes
interface PendingChanges {
  [key: string]: string; // Ex: { "hero.title": "Novo Título" }
}

// Interface para o tipo do nosso contexto
interface EditContextType {
  isEditMode: boolean;
  setEditMode: (enabled: boolean) => void;
  hasUnsavedChanges: boolean;
  saveChanges: () => Promise<void>;
  updateChange: (key: string, value: string) => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export function EditProvider({ children }: { children: ReactNode }) {
  // --- INTEGRAÇÃO COM OUTROS CONTEXTOS ---
  const { isAdmin, isAuthenticated } = useAuth();
  const { refreshContent } = useContent();
  
  // --- ESTADO INTERNO DO MODO DE EDIÇÃO ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<PendingChanges>({});

  // Derivamos se existem alterações não salvas a partir do objeto pendingChanges
  const hasUnsavedChanges = Object.keys(pendingChanges).length > 0;

  // --- EFEITOS E LÓGICA ---

  // Desativa o modo de edição se o usuário deslogar ou não for admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      setIsEditMode(false);
    }
  }, [isAuthenticated, isAdmin]);

  // Função segura para entrar/sair do modo de edição
  const setEditMode = (enabled: boolean) => {
    if (enabled && !isAdmin) {
      toast.error("Apenas administradores podem entrar no modo de edição.");
      return;
    }
    setIsEditMode(enabled);
  };

  // Função para que componentes filhos (como EditableText) registrem uma alteração
  const updateChange = (key: string, value: string) => {
    setPendingChanges(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Função para salvar as alterações no backend
  const saveChanges = async (): Promise<void> => {
    if (!hasUnsavedChanges) {
      toast.info("Nenhuma alteração para salvar.");
      return;
    }

    const changesToSave = Object.entries(pendingChanges);
    
    try {
      // Usamos a instância 'api' do Axios, que já está autenticada
      const promises = changesToSave.map(([key, value]) => 
        api.put(`/content/${key}`, { value })
      );
      
      await Promise.all(promises);
      
      setPendingChanges({}); // Limpa as alterações pendentes da memória
      await refreshContent(); // Recarrega o conteúdo do site para refletir as mudanças
      
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error('Failed to save changes:', error);
      toast.error("Falha ao salvar. Verifique o console para mais detalhes.");
      throw error;
    }
  };

  // --- VALOR DO PROVIDER ---
  const value = {
    isEditMode,
    setEditMode,
    hasUnsavedChanges,
    saveChanges,
    updateChange
  };

  return (
    <EditContext.Provider value={value}>
      {children}
    </EditContext.Provider>
  );
}

// Hook customizado para usar o contexto
export function useEdit() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
}