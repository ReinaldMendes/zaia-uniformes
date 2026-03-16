"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { EditableText } from "./EditableText";

export function Contact() {
  const [formData, setFormData] = useState({
    empresa: "",
    email: "",
    mensagem: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        // Redirect to WhatsApp
        const telefone = "5542988665220";
        const texto = `Olá, vim pelo site da ZAIA Uniformes.

Empresa: ${formData.empresa}
Email: ${formData.email}

Mensagem:
${formData.mensagem}`;

        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
        setTimeout(() => {
          window.location.href = url;
        }, 1500);

        setFormData({ empresa: "", email: "", mensagem: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Form */}
          <div data-aos="fade-right">
            <h2 className="text-5xl font-bold mb-10 tracking-tighter">
              <EditableText
                contentKey="contact.title"
                fallback="VAMOS CONVERSAR?"
                as="span"
              />
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="empresa"
                placeholder="Nome da Empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl bg-slate-50 border border-gray-200 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-zaia-primary transition-all"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail Corporativo"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl bg-slate-50 border border-gray-200 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-zaia-primary transition-all"
                required
              />

              <textarea
                name="mensagem"
                placeholder="Fale sobre sua necessidade..."
                rows={5}
                value={formData.mensagem}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl bg-slate-50 border border-gray-200 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-zaia-primary transition-all resize-none"
                required
              ></textarea>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-[#1E3A5F] text-white font-bold rounded-2xl hover:bg-[#2F5F8F] shadow-xl transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enviando..." : "Enviar Agora"}
              </button>
            </form>

            {/* Status Message */}
            {status && (
              <div
                className={`mt-6 p-5 rounded-xl text-center font-semibold ${
                  status === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status === "success"
                  ? "✔ Mensagem enviada com sucesso! Redirecionando para o WhatsApp..."
                  : "⚠ Não foi possível enviar. Tente novamente."}
              </div>
            )}
          </div>

          {/* Right Column - Contact Info & Map */}
          <div data-aos="fade-left">
            <div className="mb-10 space-y-6">
              <p className="flex items-center gap-4 text-gray-800 font-bold text-xl">
                <MapPin className="text-zaia-accent w-6 h-6" />
                <EditableText
                  contentKey="contact.address"
                  fallback="Rua Aderly Turek 177 Cara Cará, Ponta Grossa PR"
                  as="span"
                />
              </p>

              <p className="flex items-center gap-4 text-gray-800 font-bold text-xl">
                <Phone className="text-zaia-accent w-6 h-6" />
                <EditableText
                  contentKey="contact.phone"
                  fallback="(42) 98866-5220"
                  as="span"
                />
              </p>

              <p className="flex items-center gap-4 text-gray-800 font-bold text-xl">
                <Mail className="text-zaia-accent w-6 h-6" />
                <EditableText
                  contentKey="contact.email"
                  fallback="comercial@zaiauniformes.com.br"
                  as="span"
                />
              </p>
            </div>

            {/* Map */}
            <div className="h-96 w-full shadow-2xl rounded-3xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Rua%20Aderly%20Turek%20177%20Cara%20Cara%20Ponta%20Grossa%20PR&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
