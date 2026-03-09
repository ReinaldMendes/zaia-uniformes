"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { EditableText } from "./EditableText";
import { useContent } from "@/contexts/ContentContext";

export function FAQ() {
  const { content } = useContent();

  const faqData = [
    {
      questionKey: "faq.item1.question",
      answerKey: "faq.item1.answer",
      fallback: {
        question: "Como funciona a automação contábil da ContabilizeTech?",
        answer: "Nossa plataforma utiliza inteligência artificial para processar automaticamente documentos fiscais, gerar relatórios e garantir compliance. Você apenas precisa enviar os documentos e nossa IA cuida do resto, com supervisão de contadores especializados."
      }
    },
    {
      questionKey: "faq.item2.question",
      answerKey: "faq.item2.answer",
      fallback: {
        question: "Quanto tempo leva para implementar o sistema?",
        answer: "A implementação é rápida e simples. Para o plano Essencial, você pode começar a usar em até 24 horas. Para planos maiores, nossa equipe faz a migração completa em até 7 dias úteis, incluindo treinamento da sua equipe."
      }
    },
    {
      questionKey: "faq.item3.question",
      answerKey: "faq.item3.answer",
      fallback: {
        question: "Meus dados estão seguros na ContabilizeTech?",
        answer: "Sim, absolutamente. Utilizamos criptografia de ponta (AES-256), servidores no Brasil em conformidade com a LGPD, backup redundante e auditoria contínua de segurança. Seus dados têm o mesmo nível de proteção dos maiores bancos."
      }
    },
    {
      questionKey: "faq.item4.question",
      answerKey: "faq.item4.answer",
      fallback: {
        question: "Posso cancelar meu plano a qualquer momento?",
        answer: "Sim, não há fidelidade. Você pode cancelar seu plano a qualquer momento através da plataforma ou entrando em contato conosco. Garantimos a portabilidade completa dos seus dados."
      }
    },
    {
      questionKey: "faq.item5.question",
      answerKey: "faq.item5.answer",
      fallback: {
        question: "Vocês atendem empresas de todos os regimes tributários?",
        answer: "Sim, atendemos Simples Nacional, Lucro Presumido e Lucro Real. Nossa plataforma se adapta automaticamente ao regime da sua empresa e às suas obrigações específicas."
      }
    },
    {
      questionKey: "faq.item6.question",
      answerKey: "faq.item6.answer",
      fallback: {
        question: "Como funciona o suporte técnico?",
        answer: "Oferecemos suporte por chat, email e telefone. No plano Essencial, suporte por email em até 4h. Nos planos superiores, suporte prioritário com chat ao vivo e no Enterprise, suporte 24/7 com gestor dedicado."
      }
    },
    {
      questionKey: "faq.item7.question",
      answerKey: "faq.item7.answer",
      fallback: {
        question: "Posso integrar com meu sistema ERP atual?",
        answer: "Sim, nossa API permite integração com os principais ERPs do mercado (SAP, TOTVS, Senior, etc.). Nossa equipe técnica ajuda na configuração e garante que a sincronização funcione perfeitamente."
      }
    },
    {
      questionKey: "faq.item8.question",
      answerKey: "faq.item8.answer",
      fallback: {
        question: "Há desconto para contratos anuais?",
        answer: "Sim, oferecemos 20% de desconto para pagamentos anuais à vista. Para contratos de 2 anos, o desconto é de 30%. Entre em contato para condições especiais para sua empresa."
      }
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-h2 text-brand-dark mb-4">
            <EditableText contentKey="faq.title" fallback="Perguntas frequentes" as="span" />
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            <EditableText 
              contentKey="faq.description" 
              fallback="Tire suas dúvidas sobre nossos serviços. Se não encontrar a resposta, nossa equipe está pronta para ajudar."
              type="textarea"
            />
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left font-medium text-brand-dark hover:text-brand-teal transition-colors text-lg">
                <EditableText 
                  contentKey={faq.questionKey} 
                  fallback={faq.fallback.question}
                  isButtonChild={true}
                />
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-2">
                <EditableText contentKey={faq.answerKey} fallback={faq.fallback.answer} type="textarea" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-brand-dark mb-2">
            <EditableText contentKey="faq.cta.title" fallback="Ainda tem dúvidas?" />
          </h3>
          <p className="text-gray-600 mb-6">
            <EditableText contentKey="faq.cta.description" fallback="Nossa equipe de especialistas está pronta para esclarecer todas as suas questões." type="textarea" />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${content['footer.contact.email'] || 'contato@contabilizetech.com.br'}`}
              className="text-brand-teal hover:text-brand-dark transition-colors"
            >
              <EditableText contentKey="footer.contact.email" fallback="contato@contabilizetech.com.br" />
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a 
              href={`tel:${(content['footer.contact.phone'] || '').replace(/\D/g, '')}`}
              className="text-brand-teal hover:text-brand-dark transition-colors"
            >
              <EditableText contentKey="footer.contact.phone" fallback="(11) 99999-9999" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}