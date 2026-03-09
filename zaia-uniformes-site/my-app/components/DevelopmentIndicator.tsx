"use client";

import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Code, X } from 'lucide-react';
import { Button } from './ui/button';

export function DevelopmentIndicator() {
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDev = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname.includes('local') ||
                    window.location.hostname.includes('figma.com');
      
      setIsDevelopment(isDev);
    }
  }, []);

  if (!isDevelopment || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Alert className="bg-blue-50 border-blue-200 shadow-lg">
        <Code className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm pr-8">
          <strong>Modo Desenvolvimento</strong><br />
          API Mock ativa • Login com qualquer credencial
        </AlertDescription>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 h-6 w-6 p-0 hover:bg-blue-100"
        >
          <X className="h-3 w-3" />
        </Button>
      </Alert>
    </div>
  );
}