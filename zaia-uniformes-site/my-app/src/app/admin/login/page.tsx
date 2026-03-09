import { LoginForm } from "./LoginForm";
import Image from 'next/image'; // 1. Import do Image do Next.js
import Link from 'next/link';   // 2. Import do Link do Next.js

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Image 
              src="/img/contabilizetech_logo.png" 
              alt="ContabilizeTech" 
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-2xl font-semibold text-brand-dark">
              Contabilize<span className="text-brand-teal">Tech</span>
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-brand-dark mb-2">
            Área de Edição
          </h1>
          <p className="text-gray-600">
            Faça login para editar o site
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center space-y-2">
          <div>
            <Link 
              href="/cms-demo" // 2. Corrigido de 'to' para 'href'
              className="inline-flex items-center text-sm text-brand-teal hover:text-brand-dark-blue font-medium transition-colors"
            >
              🎯 Ver Demonstração do Sistema CMS
            </Link>
          </div>
          <div>
            <Link 
              href="/cms-guide" // 2. Corrigido de 'to' para 'href'
              className="inline-flex items-center text-sm text-gray-600 hover:text-brand-teal font-medium transition-colors"
            >
              📖 Guia Completo do CMS
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2024 ContabilizeTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}