"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useEdit } from '@/contexts/EditContext';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';

interface EditableTextProps {
  contentKey: string;
  fallback?: string;
  type?: 'text' | 'textarea';
  className?: string;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
  isButtonChild?: boolean;
}

export function EditableText({ 
  contentKey,
  fallback = '',
  type = 'text',
  className = '',
  placeholder = 'Digite o texto...',
  as: Component = 'span',
  isButtonChild = false
}: EditableTextProps) {
  const { isAdmin } = useAuth();
  const { content } = useContent();
  const { isEditMode, updateChange } = useEdit();
  
  const currentValue = content[contentKey] || fallback;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(currentValue);
  
  const textRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(content[contentKey] || fallback);
  }, [content, contentKey, fallback]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  const handleStartEdit = useCallback((e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsEditing(true);
  }, []);

  const handleConfirmChange = useCallback(() => {
    if (editValue !== currentValue) {
      updateChange(contentKey, editValue);
    }
    setIsEditing(false);
  }, [editValue, currentValue, contentKey, updateChange]);

  const handleCancel = useCallback(() => {
    setEditValue(currentValue);
    setIsEditing(false);
  }, [currentValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type === 'text') { e.preventDefault(); handleConfirmChange(); }
    if (e.key === 'Escape') { handleCancel(); }
  }, [type, handleConfirmChange, handleCancel]);

  if (!isEditMode || !isAdmin) {
    return <Component className={className}>{currentValue}</Component>;
  }

  if (isEditing) {
    // A lógica de renderização foi separada para ajudar o TypeScript
    if (isButtonChild) {
      return (
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleConfirmChange}
          placeholder={placeholder}
          className="border-2 border-brand-teal bg-white text-black h-full"
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <div className="flex items-center gap-2 not-prose">
        {type === 'textarea' ? (
          <Textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleConfirmChange}
            placeholder={placeholder}
            className="border-2 border-brand-teal bg-white text-black"
            rows={4}
          />
        ) : (
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleConfirmChange}
            placeholder={placeholder}
            className="border-2 border-brand-teal bg-white text-black"
          />
        )}
        <Button size="icon" onClick={handleConfirmChange} className="bg-green-600 hover:bg-green-700 h-8 w-8 flex-shrink-0">
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="destructive" onClick={handleCancel} className="h-8 w-8 flex-shrink-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  const componentProps: any = {
    ref: textRef,
    className: `relative group ${className}`,
  };
  if (isButtonChild && isEditMode) {
    componentProps.onClick = handleStartEdit;
    componentProps.style = { cursor: 'pointer' };
    componentProps.title = 'Clique para editar';
  }

  return (
    <Component {...componentProps}>
      {currentValue}
      {!isButtonChild && (
        <Button size="icon" variant="ghost" onClick={handleStartEdit} className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-brand-teal opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit3 className="h-4 w-4 text-white" />
        </Button>
      )}
    </Component>
  );
}