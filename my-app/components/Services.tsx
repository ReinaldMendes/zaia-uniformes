import { 
  User,
  Zap,
  Shield
} from "lucide-react";
import { EditableText } from "./EditableText";

const services = [
  {
    icon: User,
    title: "Linha Executive",
    description: "Sofisticação e caimento perfeito para ambientes administrativos e de liderança.",
    color: "text-zaia-primary"
  },
  {
    icon: Zap,
    title: "Linha Industrial",
    description: "Tecidos tecnológicos rip-stop com alta resistência para operação pesada.",
    color: "text-orange-600"
  },
  {
    icon: Shield,
    title: "Técnicos & EPIs",
    description: "Uniformes certificados que garantem a segurança sem perder a identidade visual.",
    color: "text-emerald-600"
  }
];

export function Services() {
  return (
    <section id="servicos" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 uppercase tracking-tighter">
            <EditableText
              contentKey="services.title"
              fallback="Nossas Linhas"
              as="span"
            />
          </h2>
          <div className="w-24 h-2 bg-[#1E3A5F] mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-slate-50 p-12 rounded-[40px] transition-all duration-300 hover:shadow-lg border border-gray-100" 
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`w-16 h-16 bg-white shadow-lg ${service.color} rounded-2xl flex items-center justify-center mb-8 text-3xl`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold mb-4 text-gray-800">
                <EditableText
                  contentKey={`services.${index}.title`}
                  fallback={service.title}
                  as="span"
                />
              </h3>
              <p className="text-gray-500 leading-relaxed italic">
                <EditableText
                  contentKey={`services.${index}.description`}
                  fallback={service.description}
                  type="textarea"
                  as="span"
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}