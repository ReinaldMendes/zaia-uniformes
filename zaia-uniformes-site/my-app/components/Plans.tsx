import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    description: "Para pequenas empresas",
    price: "R$ 299",
    period: "/mês",
    features: [
      "Até 100 documentos fiscais/mês",
      "Relatórios básicos",
      "Suporte por email",
      "Backup seguro",
      "Integração com bancos"
    ],
    buttonText: "Começar agora",
    variant: "outline" as const
  },
  {
    name: "Profissional",
    description: "Para empresas em crescimento",
    price: "R$ 599",
    period: "/mês",
    badge: "Mais Popular",
    features: [
      "Até 500 documentos fiscais/mês",
      "Relatórios avançados",
      "Suporte prioritário",
      "Backup em tempo real",
      "Integração completa",
      "Dashboard personalizado",
      "Consultoria mensal"
    ],
    buttonText: "Escolher plano",
    variant: "default" as const,
    popular: true
  },
  {
    name: "Enterprise",
    description: "Para grandes empresas",
    price: "R$ 1.299",
    period: "/mês",
    features: [
      "Documentos ilimitados",
      "Relatórios personalizados",
      "Suporte 24/7",
      "Backup redundante",
      "API personalizada",
      "Gestor dedicado",
      "Consultoria ilimitada",
      "Onboarding premium"
    ],
    buttonText: "Falar com vendas",
    variant: "outline" as const
  }
];

export function Plans() {
  return (
    <section id="plans" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-h2 text-brand-dark mb-4">
            Planos que se adaptam ao seu{" "}
            <span className="text-brand-gradient">negócio</span>
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para sua empresa. Todos incluem segurança de dados, 
            compliance fiscal e suporte especializado.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative hover-lift transition-all duration-300 ${
                plan.popular 
                  ? 'border-brand-teal shadow-xl scale-105' 
                  : 'border-gray-200 shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-brand-accent text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <h3 className="text-2xl font-semibold text-brand-dark mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-brand-dark">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-brand-gradient hover:opacity-90' 
                      : plan.variant === 'outline'
                        ? 'border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white'
                        : ''
                  }`}
                  variant={plan.popular ? 'default' : plan.variant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Não encontrou o plano ideal? Vamos criar uma solução personalizada.
          </p>
          <Button variant="ghost" className="text-brand-teal hover:text-brand-dark">
            Falar com especialista
          </Button>
        </div>
      </div>
    </section>
  );
}