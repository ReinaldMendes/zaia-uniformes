"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Dica: Use o atalho @/
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from 'next/navigation'; // 1. IMPORT CORRETO
import Link from 'next/link';           // 1. IMPORT CORRETO
import { useAuth } from "@/contexts/AuthContext";// (Mantenha este se @/ não estiver configurado para contexts)

export function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const router = useRouter(); // 2. USO CORRETO DO HOOK

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        // 3. NAVEGAÇÃO CORRETA
        router.push("/");
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <Card className="shadow-xl border-0">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-teal" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="admin@contabilizetech.com.br"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-brand-teal" />
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Digite sua senha"
                required
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-teal"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-brand-gradient hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            {/* 4. LINK CORRETO com 'href' */}
            <Link 
              href="/forgot-password"
              className="text-sm text-brand-teal hover:text-brand-dark-blue transition-colors"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Não tem uma conta?{' '}
              <Link 
                href="/register"
                className="text-brand-teal hover:text-brand-dark-blue font-medium transition-colors"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
          
          {/* O código de 'Modo de Desenvolvimento' está ok pois já é um Client Component */}
        </div>
      </CardContent>
    </Card>
  );
}