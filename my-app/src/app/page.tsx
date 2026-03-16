"use client";
import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { Services } from "../../components/Services";
import { Portfolio } from "../../components/Portfolio";
import { Testimonials } from "../../components/Testimonials";
import { Contact } from "../../components/Contact";
import { Footer } from "../../components/Footer";
import { AdminBar } from "../../components/AdminBar";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen">
      {isAdmin && <AdminBar />}
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}