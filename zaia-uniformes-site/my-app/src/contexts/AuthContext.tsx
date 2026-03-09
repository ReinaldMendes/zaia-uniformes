"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importa as funções e objetos NOMEADOS do arquivo api.ts
import { authAPI, setAuthToken } from '@/utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMINISTRATOR';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Este hook roda uma vez quando a aplicação carrega
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (token && userData) {
      setAuthToken(token); // Configura o token na API para a sessão
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Falha ao ler dados do usuário do localStorage:", error);
        // Limpa dados corrompidos
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);
      const responseData = response.data; // Lembre-se de acessar .data com axios

      if (responseData && responseData.token && responseData.user) {
        const userData: User = responseData.user;
        
        localStorage.setItem('admin_token', responseData.token);
        localStorage.setItem('admin_user', JSON.stringify(userData));
        setAuthToken(responseData.token);
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      logout(); // Limpa tudo em caso de falha
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setAuthToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMINISTRATOR';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, isLoading, login, logout }}>
      {/* Não renderiza nada até que a verificação inicial do token seja concluída */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContext.Provider');
  }
  return context;
}