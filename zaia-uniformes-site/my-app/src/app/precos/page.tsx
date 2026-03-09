import { Header } from "../../../components/Header";
import { Plans } from "../../../components/Plans";
import { FAQ } from "../../../components/FAQ";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrecosPage() {
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
                Planos e{" "}
                <span className="text-brand-gradient">Preços</span>
              </h1>
              
              <p className="text-body text-gray-600 mb-8">
                Escolha o plano ideal para sua empresa. Todas as opções incluem segurança de dados, 
                compliance fiscal e suporte especializado. Sem taxa de setup ou fidelidade.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-brand-gradient hover:opacity-90"
                >
                  Falar com especialista
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                >
                  Agendar demonstração
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Plans />
        
        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-brand-dark mb-4">
                Comparação{" "}
                <span className="text-brand-gradient">detalhada</span>
              </h2>
              <p className="text-body text-gray-600 max-w-2xl mx-auto">
                Veja todos os recursos incluídos em cada plano para escolher 
                a melhor opção para sua empresa.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-brand-teal to-brand-dark-blue text-white">
                    <th className="text-left p-6 font-semibold">Recursos</th>
                    <th className="text-center p-6 font-semibold">Essencial</th>
                    <th className="text-center p-6 font-semibold">Profissional</th>
                    <th className="text-center p-6 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-6 font-medium text-brand-dark">Documentos fiscais/mês</td>
                    <td className="p-6 text-center text-gray-600">100</td>
                    <td className="p-6 text-center text-gray-600">500</td>
                    <td className="p-6 text-center text-brand-accent font-semibold">Ilimitado</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-6 font-medium text-brand-dark">Relatórios</td>
                    <td className="p-6 text-center text-gray-600">Básicos</td>
                    <td className="p-6 text-center text-gray-600">Avançados</td>
                    <td className="p-6 text-center text-brand-accent font-semibold">Personalizados</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium text-brand-dark">Suporte</td>
                    <td className="p-6 text-center text-gray-600">Email</td>
                    <td className="p-6 text-center text-gray-600">Prioritário</td>
                    <td className="p-6 text-center text-brand-accent font-semibold">24/7 Dedicado</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-6 font-medium text-brand-dark">Integrações</td>
                    <td className="p-6 text-center text-gray-600">Bancos</td>
                    <td className="p-6 text-center text-gray-600">Completa</td>
                    <td className="p-6 text-center text-brand-accent font-semibold">API Custom</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-medium text-brand-dark">Backup</td>
                    <td className="p-6 text-center text-gray-600">Diário</td>
                    <td className="p-6 text-center text-gray-600">Tempo real</td>
                    <td className="p-6 text-center text-brand-accent font-semibold">Redundante</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
    </div>
  );
}