import '../../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ContentProvider } from '@/contexts/ContentContext';
import { EditProvider } from '@/contexts/EditContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zaia Uniformes | Uniformes Corporativos e Industriais',
  description:
    'Uniformes profissionais, industriais e corporativos sob medida. Qualidade, conforto e identidade visual para sua empresa.',
  keywords:
    'uniformes corporativos, uniformes profissionais, uniformes industriais, roupas empresariais, uniformes personalizados, uniformes para empresas',
  authors: [{ name: 'Zaia Uniformes' }],
  openGraph: {
    title: 'Zaia Uniformes Corporativos',
    description:
      'Uniformes profissionais e empresariais sob medida para sua empresa.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/img/logo.png', // ⚠️ coloque essa imagem em /public/img
        width: 1200,
        height: 630,
        alt: 'Zaia Uniformes Corporativos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaia Uniformes Corporativos',
    description:
      'Uniformes profissionais e industriais com qualidade e estilo.',
    images: ['/img/logo.png'],
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
        {/* Fundo principal */}
        <div className="relative min-h-screen bg-gray-900 text-gray-200">
          
          {/* Background pattern leve */}
          <div className="absolute inset-0 bg-main-pattern bg-repeat opacity-5 pointer-events-none z-0"></div>

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <AuthProvider>
              <ContentProvider>
                <EditProvider>
                  <div className="flex-grow">
                    {children}
                  </div>
                </EditProvider>
              </ContentProvider>
            </AuthProvider>
          </div>

        </div>
      </body>
    </html>
  );
}