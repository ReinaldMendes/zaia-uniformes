"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Edit3, 
  Save, 
  LogOut, 
  Settings, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Users,
  Home 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEdit } from '@/contexts/EditContext';
import { useContent } from '@/contexts/ContentContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { HelpModal } from './HelpModal';
import Link from 'next/link';

export function AdminBar() {
  const { user, logout } = useAuth();
  const { refreshContent } = useContent();
  const { 
    isEditMode, 
    setEditMode, 
    hasUnsavedChanges, 
    saveChanges 
  } = useEdit();

  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const router = useRouter();

  if (!user || user.role !== 'ADMINISTRATOR') {
    return null; 
  }

  const handleToggleEditMode = () => {
    if (isEditMode && hasUnsavedChanges) {
      if (!window.confirm('Você tem alterações não salvas. Deseja continuar sem salvar?')) return;
    }
    setEditMode(!isEditMode);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      await saveChanges();
      setSaveStatus('success');
      toast.success('Todas as alterações foram salvas!');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      toast.error('Erro ao salvar alterações. Tente novamente.');
      setTimeout(() => setSaveStatus('idle'), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshContent();
      toast.success('Conteúdo recarregado!');
    } catch (error) {
      toast.error('Erro ao recarregar conteúdo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('Você tem alterações não salvas. Deseja sair mesmo assim?')) return;
    }
    logout();
    router.push('/');
  };

  const handleHelp = () => {
    setIsHelpModalOpen(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-brand-dark border-b border-brand-teal/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Lado Esquerdo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-brand-teal rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Modo Administrador</span>
              </div>
              <Badge variant={isEditMode ? "default" : "secondary"} className={isEditMode ? "bg-brand-teal text-white" : ""}>
                {isEditMode ? "Editando" : "Visualizando"}
              </Badge>
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="animate-pulse">Alterações não salvas</Badge>
              )}
            </div>

            {/* Status de Salvamento no Centro */}
            {saveStatus === 'success' && (
              <Alert className="bg-green-50 border-green-200 py-1 px-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-sm">
                  Alterações salvas com sucesso!
                </AlertDescription>
              </Alert>
            )}
            {saveStatus === 'error' && (
               <Alert variant="destructive" className="py-1 px-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Erro ao salvar alterações.
                </AlertDescription>
              </Alert>
            )}

            {/* Lado Direito */}
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm hidden sm:block">Olá, {user.name}</span>
              
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-brand-teal/20 h-8" title="Voltar para a Página Inicial">
                  <Home className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Início</span>
                </Button>
              </Link>
              
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="text-white hover:bg-brand-teal/20 h-8" title="Recarregar conteúdo">
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleToggleEditMode} className="text-white hover:bg-brand-teal/20 h-8">
                {isEditMode ? <><EyeOff className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Sair da Edição</span></> : <><Edit3 className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Editar</span></>}
              </Button>

              {isEditMode && hasUnsavedChanges && (
                <Button variant="ghost" size="sm" onClick={handleSave} disabled={isSaving} className="text-white hover:bg-green-600/20 h-8 bg-green-600/10">
                  <Save className="h-4 w-4 mr-1" /><span className="hidden sm:inline">{isSaving ? 'Salvando...' : 'Salvar'}</span>
                </Button>
              )}
              
              <Link href="/admin/users">
                <Button variant="ghost" size="sm" className="text-white hover:bg-brand-teal/20 h-8">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Usuários</span>
                </Button>
              </Link>
              
              <Button variant="ghost" size="sm" onClick={handleHelp} className="text-white hover:bg-brand-teal/20 h-8">
                <Settings className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Ajuda</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-red-600/20 h-8">
                <LogOut className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <HelpModal open={isHelpModalOpen} onOpenChange={setIsHelpModalOpen} />

      <div className="h-12"></div>
    </>
  );
}