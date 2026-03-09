import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Users, FileText, Calculator, Shield, BarChart3 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: FileText,
    title: "Contabilidade Fiscal",
    description: "Gestão completa das obrigações fiscais com automação de processos e entregas dentro do prazo.",
    features: [
      "Escrituração contábil digital",
      "SPED Contábil e Fiscal",
      "Balancetes mensais",
      "Demonstrações financeiras",
      "Conciliação bancária"
    ],
    popular: false
  },
  {
    icon: Calculator,
    title: "Gestão Tributária",
    description: "Planejamento e otimização tributária para reduzir custos e manter compliance total.",
    features: [
      "Apuração de impostos",
      "Planejamento tributário",
      "Revisão de regimes",
      "Recuperação de créditos",
      "Consultoria especializada"
    ],
    popular: true
  },
  {
    icon: Users,
    title: "Departamento Pessoal",
    description: "Gestão completa de recursos humanos com tecnologia e expertise especializada.",
    features: [
      "Folha de pagamento",
      "Admissões e demissões",
      "Obrigações trabalhistas",
      "eSocial e FGTS",
      "Controle de ponto"
    ],
    popular: false
  },
  {
    icon: BarChart3,
    title: "Controladoria",
    description: "Relatórios gerenciais e análises financeiras para tomada de decisões estratégicas.",
    features: [
      "Relatórios gerenciais",
      "Dashboard em tempo real",
      "Análise de indicadores",
      "Projeções financeiras",
      "Consultoria estratégica"
    ],
    popular: false
  },
  {
    icon: Shield,
    title: "Compliance e Auditoria",
    description: "Garantia de conformidade legal e preparação para auditorias internas e externas.",
    features: [
      "Auditoria interna",
      "Compliance fiscal",
      "Controles internos",
      "Risk assessment",
      "Relatórios de conformidade"
    ],
    popular: false
  },
  {
    icon: Clock,
    title: "Consultoria Empresarial",
    description: "Orientação estratégica para crescimento sustentável e otimização de processos.",
    features: [
      "Análise de viabilidade",
      "Reestruturação societária",
      "Planejamento sucessório",
      "Fusões e aquisições",
      "Consultoria financeira"
    ],
    popular: false
  }
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-light to-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Link href="/" className="inline-flex items-center text-brand-teal hover:text-brand-dark mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para home
              </Link>
              
              <h1 className="text-hero text-brand-dark mb-6">
                Nossos{" "}
                <span className="text-brand-gradient">Serviços</span>
              </h1>
              
              <p className="text-body text-gray-600 mb-8">
                Soluções contábeis completas com tecnologia de ponta. Desde a escrituração fiscal 
                até consultoria estratégica, temos tudo que sua empresa precisa para crescer.
              </p>
              
              <Button 
                size="lg" 
                className="bg-brand-gradient hover:opacity-90"
              >
                Solicitar orçamento
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className={`relative hover-lift transition-all duration-300 ${
                    service.popular 
                      ? 'border-brand-teal shadow-xl' 
                      : 'border-gray-200 shadow-lg'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-brand-accent text-white px-4 py-1">
                        Mais Procurado
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-dark-blue/10 flex items-center justify-center mb-4">
                        <service.icon className="h-7 w-7 text-brand-teal" />
                      </div>
                      <h3 className="text-xl font-semibold text-brand-dark mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                      variant="outline"
                    >
                      Saiba mais
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-brand-dark mb-4">
                Como{" "}
                <span className="text-brand-gradient">funciona</span>
              </h2>
              <p className="text-body text-gray-600 max-w-2xl mx-auto">
                Um processo simples e eficiente que combina tecnologia avançada 
                com expertise contábil para entregar resultados excepcionais.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gradient text-white flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">Análise Inicial</h3>
                <p className="text-gray-600">Entendemos seu negócio e necessidades específicas</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gradient text-white flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">Configuração</h3>
                <p className="text-gray-600">Configuramos a plataforma e migramos seus dados</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gradient text-white flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">Automação</h3>
                <p className="text-gray-600">Iniciamos a automação dos processos contábeis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gradient text-white flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">Suporte Contínuo</h3>
                <p className="text-gray-600">Acompanhamento constante e suporte especializado</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-dark text-white">
          <div className="container mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-h2 mb-4">
              Pronto para{" "}
              <span className="text-brand-gradient">transformar</span>{" "}
              sua contabilidade?
            </h2>
            <p className="text-body text-gray-300 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos automatizar 
              sua gestão contábil e impulsionar o crescimento da sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-gradient hover:opacity-90"
              >
                Agendar demonstração
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
              >
                Falar com especialista
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}