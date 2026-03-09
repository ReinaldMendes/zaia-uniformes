"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Upload, Check, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { useEdit } from '@/contexts/EditContext';
import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import { api } from '@/utils/api';
import { toast } from 'sonner';

// 1. Interface de props corrigida
interface EditableImageProps {
  contentKey: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean; // <-- ADICIONE ESTA LINHA
}

export function EditableImage({ 
  contentKey,
  fallback,
  alt,
  width,
  height,
  className = '',
  ...props
}: EditableImageProps) {
  const { isAdmin } = useAuth();
  const { isEditMode } = useEdit();
  const { content, refreshContent } = useContent();

  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageUrl = content[contentKey] || fallback;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Arquivo muito grande. Máximo permitido: 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      setSelectedFile(file); // Guarda o arquivo para o upload
      
      const reader = new FileReader();
      reader.onload = (e) => setPreviewSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      toast.info("Nenhuma nova imagem selecionada para salvar.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('imageFile', selectedFile);
    formData.append('key', contentKey);

    try {
      // 2. Lógica de upload centralizada aqui
      await api.post('/content/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await refreshContent(); // 3. Atualiza o conteúdo na página
      toast.success('Imagem atualizada com sucesso!');
      handleCancel(); // Fecha e reseta o dialog
    } catch (error) {
      toast.error('Erro ao enviar imagem. Tente novamente.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setShowUploadDialog(false);
    setPreviewSrc(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canEdit = isAdmin && isEditMode;

  return (
    <>
      <div
        className={`relative group ${className}`}
      >
        {/* 4. Usando o <Image> do Next.js */}
        <Image 
          src={imageUrl} 
          alt={alt} 
          width={width}
          height={height}
          className={className}
          {...props}
        />
        
        {canEdit && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
            onClick={() => setShowUploadDialog(true)}
          >
            <div className="text-center text-white">
              <Camera className="h-8 w-8 mx-auto" />
              <p className="text-sm mt-1">Editar Imagem</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Atualizar Imagem: {alt}</DialogTitle>
          </DialogHeader>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center min-h-[200px] flex items-center justify-center">
            {previewSrc ? (
                <Image src={previewSrc} alt="Preview" width={200} height={200} style={{ objectFit: 'contain', maxHeight: '200px' }} />
            ) : (
              <div className="text-gray-500">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <p>Preview da nova imagem aparecerá aqui.</p>
              </div>
            )}
          </div>

          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full"
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Selecionar Arquivo
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <DialogFooter>
            <Button onClick={handleCancel} variant="outline" disabled={isUploading}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-brand-gradient"
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
              {isUploading ? 'Enviando...' : 'Salvar Imagem'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}