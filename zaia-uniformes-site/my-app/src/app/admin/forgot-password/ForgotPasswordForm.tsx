"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Card, CardContent } from "../../../../components/ui/card";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { Mail, Send, CheckCircle } from "lucide-react";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("E-mail é obrigatório");
      return;
    }

    if (!email.includes("@")) {
      setError("E-mail inválido");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) setError("");
  };

  if (success) {
    return (
      <Card className="shadow-xl border-0">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-brand-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-dark mb-2">
              E-mail Enviado!
            </h3>
            <p className="text-gray-600 mb-4">
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200 mb-6">
            <AlertDescription className="text-blue-800">
              <strong>E-mail enviado para:</strong> {email}
            </AlertDescription>
          </Alert>

          <div className="text-sm text-gray-600 space-y-2">
            <p>• Verifique também a pasta de spam</p>
            <p>• O link é válido por 24 horas</p>
            <p>• Se não receber, tente novamente em alguns minutos</p>
          </div>

          <Button
            onClick={() => {
              setSuccess(false);
              setEmail("");
            }}
            variant="ghost"
            className="mt-6 text-brand-teal hover:text-brand-dark-blue"
          >
            Enviar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

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
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Digite seu e-mail cadastrado"
              required
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-brand-gradient hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Send className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Link
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Como funciona:</strong>
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Enviaremos um link seguro para seu e-mail</li>
            <li>• Clique no link para criar uma nova senha</li>
            <li>• O link expira em 24 horas por segurança</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}