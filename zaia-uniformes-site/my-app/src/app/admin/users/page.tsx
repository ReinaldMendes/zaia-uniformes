"use client";

import { AdminBar } from "@/components/AdminBar";
import { UserManagement } from "@/components/UserManagement";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Página protegida para gerenciamento de usuários
export default function AdminUsersPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não está carregando e o usuário não é admin, redireciona
    if (!isLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, isLoading, router]);

  // Mostra um loader ou nada enquanto verifica a autenticação
  if (isLoading || !isAdmin) {
    return <div className="h-screen w-full flex items-center justify-center">Carregando...</div>;
  }

  // Se for admin, mostra a página
  return (
    <>
      <AdminBar />
      <main className="container mx-auto max-w-4xl py-12 px-6">
        <UserManagement />
      </main>
    </>
  );
}