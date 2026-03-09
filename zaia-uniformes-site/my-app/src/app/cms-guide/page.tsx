"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Edit3, Camera, Settings, Save, Eye, EyeOff, Move, Check, X, Upload 
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { EditableText } from "@/components/EditableText";
import { useContent } from "@/contexts/ContentContext";


export default function CMSGuidePage() {
  const { content } = useContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/img/contabilizetech_logo.png"
                alt="ContabilizeTech" 
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-semibold text-brand-dark">
                Contabilize<span className="text-brand-teal">Tech</span>
              </span>
            </Link>
            <div className="flex space-x-3">
              <Link href="/cms-demo">
                <Button className="bg-brand-gradient">
                  Ver Demonstração
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline">
                  Fazer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            <EditableText contentKey="cms_guide.hero.title" fallback="Guia do Sistema CMS Inline" />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <EditableText contentKey="cms_guide.hero.description" fallback="Aprenda como usar o sistema de edição inline da ContabilizeTech para gerenciar o conteúdo do seu site de forma intuitiva e eficiente." type="textarea"/>
          </p>
        </div>

        {/* Authentication Flow */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            <EditableText contentKey="cms_guide.auth.title" fallback="1. Fluxo de Autenticação" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardHeader><CardTitle><EditableText contentKey="cms_guide.auth.card1.title" fallback="Login" /></CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600"><EditableText contentKey="cms_guide.auth.card1.p1" fallback="Acesse a página de login administrativo com suas credenciais." /></p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2"><EditableText contentKey="cms_guide.auth.card1.p2" fallback="Credenciais Demo:" /></p>
                  <p className="text-xs text-gray-600"><EditableText contentKey="cms_guide.auth.card1.p3" fallback="admin@contabilizetech.com.br" /></p>
                  <p className="text-xs text-gray-600"><EditableText contentKey="cms_guide.auth.card1.p4" fallback="admin123" /></p>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader><CardTitle><EditableText contentKey="cms_guide.auth.card2.title" fallback="Cadastro" /></CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600"><EditableText contentKey="cms_guide.auth.card2.p1" fallback="Registre uma nova conta de administrador." /></p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader><CardTitle><EditableText contentKey="cms_guide.auth.card3.title" fallback="Recuperação" /></CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600"><EditableText contentKey="cms_guide.auth.card3.p1" fallback="Recupere o acesso através do seu e-mail." /></p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CMS Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            <EditableText contentKey="cms_guide.editing.title" fallback="2. Sistema de Edição Inline" />
          </h2>
          <Card>
            <CardHeader><CardTitle><EditableText contentKey="cms_guide.editing.bar.title" fallback="Barra de Administração" /></CardTitle></CardHeader>
            <CardContent>
              {/* ... aqui você continuaria a aplicar o EditableText se necessário ... */}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">
            <EditableText contentKey="cms_guide.cta.title" fallback="Pronto para Experimentar?" />
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            <EditableText contentKey="cms_guide.cta.description" fallback="Explore o sistema completo na nossa demonstração interativa ou faça login para começar a usar." />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cms-demo">
              <Button size="lg" className="bg-brand-gradient">
                <EditableText contentKey="cms_guide.cta.button_demo" fallback="🎯 Ver Demonstração Completa" isButtonChild={true} />
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button size="lg" variant="outline" className="border-brand-teal text-brand-teal">
                <EditableText contentKey="cms_guide.cta.button_login" fallback="Fazer Login" isButtonChild={true} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}