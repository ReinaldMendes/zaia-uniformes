import { ForgotPasswordForm } from "./ForgotPasswordForm";
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-6">
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
          </Link>
          <h1 className="text-2xl font-semibold text-brand-dark mb-2">
            Recuperar Acesso
          </h1>
          <p className="text-gray-600">
            Digite seu e-mail para enviarmos um link de redefinição de senha.
          </p>
        </div>
        
        <ForgotPasswordForm />
        
        <div className="mt-6 text-center">
          <Link 
            href="/admin/login" 
            className="text-sm text-brand-teal hover:text-brand-dark-blue font-medium transition-colors"
          >
            ← Voltar para o login
          </Link>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 ContabilizeTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}