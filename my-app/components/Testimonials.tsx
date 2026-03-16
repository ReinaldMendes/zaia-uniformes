"use client";

import { Star } from "lucide-react";
import { EditableText } from "./EditableText";

const testimonialsData = [
  {
    name: "Pedro Álvares",
    role: "Logística",
    content: "A durabilidade dos tecidos da ZAIA é impressionante. Nossa equipe operacional nunca esteve tão bem vestida.",
  },
  {
    name: "Juliana Mendes",
    role: "RH Premium",
    content: "O atendimento personalizado da fábrica facilitou muito a escolha das cores da nossa marca corporativa.",
  },
  {
    name: "Ricardo Gomes",
    role: "Diretor Industrial",
    content: "Melhor confecção de Ponta Grossa. Prazos rigorosos e qualidade de alfaiataria industrial.",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-[#1E3A5F] text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 italic">
            <EditableText
              contentKey="testimonials.title"
              fallback="A Voz de Quem Confia"
              as="span"
            />
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 p-10 rounded-[40px] border border-white/10 hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Stars */}
              <div className="flex text-zaia-accent mb-6 text-xl">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                "<EditableText
                  contentKey={`testimonials.${index}.content`}
                  fallback={testimonial.content}
                  type="textarea"
                  as="span"
                />"
              </p>

              {/* Author */}
              <p className="font-bold text-sm uppercase tracking-widest text-zaia-accent">
                — <EditableText
                  contentKey={`testimonials.${index}.name`}
                  fallback={testimonial.name}
                  as="span"
                />, <EditableText
                  contentKey={`testimonials.${index}.role`}
                  fallback={testimonial.role}
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
