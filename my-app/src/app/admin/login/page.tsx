import { LoginForm } from "./LoginForm";
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Image 
              src="/img/logo.png" // ⚠️ troque pela logo correta
              alt="Zaia Uniformes" 
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-bold text-gray-800">
              Zaia <span className="text-orange-500">Uniformes</span>
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Painel Administrativo
          </h1>

          <p className="text-gray-600">
            Acesse para gerenciar o site
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Rodapé */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Zaia Uniformes. Todos os direitos reservados.</p>
        </div>

      </div>
    </div>
  );
}