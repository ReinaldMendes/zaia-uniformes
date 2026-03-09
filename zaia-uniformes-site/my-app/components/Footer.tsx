"use client";

import { Separator } from "./ui/separator";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import Link from 'next/link';

export function Footer() {
  const { content } = useContent();

  const serviceLinks = [
    { key: "footer.services.item1", fallback: "Uniformes Empresariais", hrefKey: "footer.services.item1.href" },
    { key: "footer.services.item2", fallback: "Uniformes Industriais", hrefKey: "footer.services.item2.href" },
    { key: "footer.services.item3", fallback: "Uniformes Profissionais", hrefKey: "footer.services.item3.href" },
  ];

  const companyLinks = [
    { key: "footer.company.item1", fallback: "Sobre nós", hrefKey: "footer.company.item1.href" },
    { key: "footer.company.item2", fallback: "Nossos produtos", hrefKey: "footer.company.item2.href" },
    { key: "footer.company.item3", fallback: "Contato", hrefKey: "footer.company.item3.href" },
  ];
  
  // Links corretos das redes sociais
  const socialLinks = {
      linkedin: content['footer.social.linkedin.url'] || 'https://www.linkedin.com/company/zaia-uniformes/',
      instagram: content['footer.social.instagram.url'] || 'https://www.instagram.com/zaiauniformes/'
  }

  return (
    // Adicionamos 'relative' e 'overflow-hidden'
    <footer id="contact" className="bg-brand-dark text-white relative overflow-hidden">
      {/* Adicionamos a div de imagem de fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: 'url(/img/background-pattern.png)' }}
      ></div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <EditableImage
                  contentKey="footer.logo"
                  fallback="/img/logo-contabilizetech.png"
                  alt="Zaia Uniformes Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 filter brightness-0 invert"
                />
                <span className="text-xl font-semibold text-white">
                  Zaia <span className="text-brand-teal">Uniformes</span>
                </span>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                <EditableText contentKey="footer.description" fallback="Especialistas em confecção de uniformes profissionais para empresas, indústrias e profissionais de todos os setores." type="textarea" />
              </p>
              <div className="space-y-3">
                <a href={`mailto:${content['footer.contact.email']}`} className="flex items-center space-x-3 text-gray-300 hover:text-brand-teal">
                  <Mail className="h-5 w-5 text-brand-teal" />
                  <span><EditableText contentKey="footer.contact.email" fallback="comercial@contabilizetech.com.br" as="span" /></span>
                </a>
                <a href={`tel:${(content['footer.contact.phone'] || '').replace(/\D/g, '')}`} className="flex items-center space-x-3 text-gray-300 hover:text-brand-teal">
                  <Phone className="h-5 w-5 text-brand-teal" />
                  <span><EditableText contentKey="footer.contact.phone" fallback="(42) 99820-2183" as="span" /></span>
                </a>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brand-teal" />
                  <span className="text-gray-300"><EditableText contentKey="footer.contact.address" fallback="Rua Riachuelo, 129, sala 1" as="span" /></span>
                </div>
              </div>
            </div>
            
            {/* Services & Company Links */}
            <div>
              <h3 className="font-semibold mb-6"><EditableText contentKey="footer.services.title" fallback="Serviços" as="span" /></h3>
              <ul className="space-y-3 text-gray-300">
                {serviceLinks.map(link => (
                  <li key={link.key}>
                    <Link href={content[link.hrefKey] || '#'} className="hover:text-brand-teal transition-colors">
                      <EditableText contentKey={link.key} fallback={link.fallback} as="span" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6"><EditableText contentKey="footer.company.title" fallback="Empresa" as="span" /></h3>
              <ul className="space-y-3 text-gray-300">
                {companyLinks.map(link => (
                  <li key={link.key}>
                    <Link href={content[link.hrefKey] || '#'} className="hover:text-brand-teal transition-colors">
                      <EditableText contentKey={link.key} fallback={link.fallback} as="span" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-700" />
        
        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-gray-400">
               <EditableText contentKey="footer.copyright" fallback="© 2024 ContabilizeTech. Todos os direitos reservados." as="p" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 mr-2"><EditableText contentKey="footer.social.handle" fallback="@contabilizetech" as="span" /></span>
              <Link href={socialLinks.linkedin} target="_blank" className="p-2 rounded-lg bg-gray-800 hover:bg-brand-teal transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href={socialLinks.instagram} target="_blank" className="p-2 rounded-lg bg-gray-800 hover:bg-brand-teal transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}