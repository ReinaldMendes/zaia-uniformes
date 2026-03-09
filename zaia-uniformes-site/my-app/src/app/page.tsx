"use client";
import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { Features } from "../../components/Features";
import { Services } from "../../components/Services";
import { Partners } from "../../components/Partners";
import { Testimonials } from "../../components/Testimonials";
import { FAQ } from "../../components/FAQ";
import { Footer } from "../../components/Footer";
import { AdminBar } from "../../components/AdminBar";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {isAuthenticated && <AdminBar />}
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <Partners />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}