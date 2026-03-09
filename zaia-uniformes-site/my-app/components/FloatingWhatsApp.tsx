"use client";

import { MessageCircle } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import Link from 'next/link';

export function FloatingWhatsApp() {
  const { content } = useContent();

  // Busca o número do WhatsApp do nosso CMS. O fallback é um número genérico.
  // Remova os caracteres não numéricos para a URL.
  const whatsappNumber = (content['footer.contact.phone'] || '5542998202183').replace(/\D/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </Link>
  );
}