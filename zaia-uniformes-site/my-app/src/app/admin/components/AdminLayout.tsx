"use client";

import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "../../../../components/ui/button";
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, Menu, X, UserPlus, BarChart3, Calendar 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: UserPlus },
  { name: 'Clientes', href: '/admin/clientes', icon: Users },
  { name: 'Relatórios', href: '/admin/relatorios', icon: BarChart3 },
  { name: 'Agendamentos', href: '/admin/agendamentos', icon: Calendar },
  { name: 'CMS', href: '/', icon: FileText }, // Aponta para a Home para editar
  { name: 'Configurações', href: '/admin/configuracoes', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/img/contabilizetech_logo.png" 
              alt="ContabilizeTech" 
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-brand-dark">
              Contabilize<span className="text-brand-teal">Tech</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-brand-gradient text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1"></div> {/* Spacer */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 text-right">
              <p className="font-semibold">{user?.name || 'Administrador'}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-brand-gradient rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}