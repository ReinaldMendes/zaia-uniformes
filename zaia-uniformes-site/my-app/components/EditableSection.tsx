"use client";

import { useState, ReactNode } from 'react';
import { Settings, Edit3, Move, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { useEdit } from '@/contexts/EditContext'; // 1. Imports corrigidos e organizados
import { useAuth } from '@/contexts/AuthContext';

interface EditableSectionProps {
  children: ReactNode;
  id: string;
  title: string;
  className?: string;
  // Funções para o futuro (quando o backend suportar)
  // onMove?: (direction: 'up' | 'down') => void;
  // onToggleVisibility?: () => void;
  // isVisible?: boolean;
}

export function EditableSection({ 
  children, 
  id, 
  title, 
  className = '', 
}: EditableSectionProps) {
  // 2. Hooks chamados dentro do componente
  const { isAdmin } = useAuth();
  const { isEditMode } = useEdit();
  
  const [isHovered, setIsHovered] = useState(false);

  // Apenas mostra os controles se o usuário for admin e o modo de edição estiver ativo
  const canShowControls = isAdmin && isEditMode;
  const showControlsOnHover = canShowControls && isHovered;

  // Funções para funcionalidades futuras
  const handleMove = (direction: 'up' | 'down') => {
    alert(`Funcionalidade "Mover Seção ${direction}" a ser implementada.`);
  };
  
  const handleToggleVisibility = () => {
    alert('Funcionalidade "Mostrar/Ocultar Seção" a ser implementada.');
  };

  return (
    // 3. Lógica de hover e visibilidade simplificada
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Controles de Edição da Seção */}
      {canShowControls && (
        <div 
          className={`absolute top-4 right-4 z-20 flex items-center space-x-2 transition-opacity duration-300 ${
            showControlsOnHover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Badge variant="secondary" className="bg-brand-dark text-white shadow-md">
            {title}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="h-8 w-8 p-0 bg-brand-teal hover:bg-brand-dark-blue shadow-lg">
                <Settings className="h-4 w-4 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => alert('Abrir modal de edição de conteúdo da seção')}>
                <Edit3 className="h-4 w-4 mr-2" />
                Editar Conteúdo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMove('up')}>
                <Move className="h-4 w-4 mr-2" />
                Mover para Cima
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMove('down')}>
                <Move className="h-4 w-4 mr-2" />
                Mover para Baixo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleToggleVisibility}>
                <Eye className="h-4 w-4 mr-2" />
                Ocultar Seção
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Conteúdo da Seção */}
      <div className={canShowControls ? 'border-2 border-dashed border-transparent hover:border-brand-teal rounded-lg transition-all' : ''}>
        {children}
      </div>
    </div>
  );
}