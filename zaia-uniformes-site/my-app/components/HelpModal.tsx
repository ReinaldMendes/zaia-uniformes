"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { HelpCircle, Edit3, Save, Image as ImageIcon } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-brand-dark">
            <HelpCircle className="h-6 w-6 text-brand-teal" />
            Manual de Edição do Site
          </DialogTitle>
          <DialogDescription className="text-gray-600 pt-2">
            Guia rápido de como utilizar o sistema de gerenciamento de conteúdo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-6 text-gray-700">
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Edit3 className="h-5 w-5 text-brand-teal" />
              Editando Textos
            </h3>
            <p><strong>1. Ative o Modo de Edição:</strong> Clique no botão "Editar" na barra administrativa no topo da página.</p>
            <p><strong>2. Edite o Conteúdo:</strong> Passe o mouse sobre qualquer texto. Um ícone de edição azul aparecerá. Clique nele (ou no próprio texto, se estiver dentro de um botão) para abrir a caixa de edição.</p>
            <p><strong>3. Confirme a Mudança:</strong> Após editar, clique no botão verde de "check" (✓) ou clique fora do campo para confirmar a alteração.</p>
          </div>

          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <ImageIcon className="h-5 w-5 text-brand-teal" />
              Trocando Imagens
            </h3>
            <p><strong>1. Ative o Modo de Edição:</strong> Com o modo de edição ativo, passe o mouse sobre qualquer imagem editável.</p>
            <p><strong>2. Abra o Upload:</strong> Uma sobreposição com um ícone de câmera aparecerá. Clique nela para abrir a janela de seleção de arquivo.</p>
            <p><strong>3. Salve a Nova Imagem:</strong> Selecione a imagem do seu computador e clique em "Salvar Imagem" para fazer o upload e atualizar o site.</p>
          </div>

          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Save className="h-5 w-5 text-brand-teal" />
              Salvando as Alterações
            </h3>
            <p>Após fazer todas as suas edições de texto, um botão verde **"Salvar Alterações"** aparecerá na barra administrativa.</p>
            <p>Clique nele para enviar todas as suas mudanças para o servidor de uma só vez. A página será recarregada com o novo conteúdo.</p>
            <p className="text-sm text-gray-500 mt-1"><strong>Importante:</strong> Se você sair da página ou deslogar sem salvar, suas alterações de texto serão perdidas.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}