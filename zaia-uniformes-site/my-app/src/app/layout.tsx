import '../../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ContentProvider } from '@/contexts/ContentContext';
import { EditProvider } from '@/contexts/EditContext';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ContabilizeTech - Soluções Contábeis Automatizadas',
  description: 'Automatize sua contabilidade com tecnologia de ponta. Mais tempo para focar no que realmente importa: o crescimento do seu negócio.',
  keywords: 'contabilidade, automação, gestão financeira, empresa, tecnologia',
  authors: [{ name: 'ContabilizeTech' }],
  openGraph: {
    title: 'ContabilizeTech - Soluções Contábeis Automatizadas',
    description: 'Automatize sua contabilidade com tecnologia de ponta. Mais tempo para focar no que realmente importa: o crescimento do seu negócio.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContabilizeTech - Soluções Contábeis Automatizadas',
    description: 'Automatize sua contabilidade com tecnologia de ponta.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 1. Wrapper principal para controlar o fundo */}
        <div className="relative min-h-screen bg-brand-dark-blue text-gray-200">
          {/* 2. Camada da imagem de fundo transparente */}
          <div className="absolute inset-0 bg-main-pattern bg-repeat opacity-5 pointer-events-none z-0"></div>
          
          {/* 3. Camada do conteúdo, por cima do fundo */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <AuthProvider>
              <ContentProvider>
                <EditProvider>
                  <div className="flex-grow">
                    {children}
                  </div>
                  <FloatingWhatsApp />
                </EditProvider>
              </ContentProvider>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}