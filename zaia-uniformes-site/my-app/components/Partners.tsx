"use client";

import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useEdit } from '@/contexts/EditContext';
import { partnersAPI } from '@/utils/api';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
  DialogClose
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PlusCircle, Trash2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { EditableText } from './EditableText';
import useEmblaCarousel from 'embla-carousel-react';

type Partner = {
  _id?: string;
  name: string;
  imageUrl: string;
};

const defaultPartners: Partner[] = [
  { name: 'ContabilizeTech Logo', imageUrl: '/img/logo-contabilizetech.png' },
  { name: 'Laboratório VIDA EXAMES Logo', imageUrl: '/img/logo-vida-exames.png' },
  { name: 'AGILIZZA SERVIÇOS Logo', imageUrl: '/img/logo-agilizza.png' },
  { name: 'ODONTO EXCELLENCE Logo', imageUrl: '/img/odonto_excellence_transparente.png' }
];

export function Partners() {
  const { isAdmin } = useAuth();
  const { isEditMode } = useEdit();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerFile, setNewPartnerFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const response = await partnersAPI.getAll();
      if (response.data && response.data.length > 0) {
        setPartners(response.data);
      } else {
        setPartners(defaultPartners);
      }
    } catch (error) {
      console.error("Erro ao buscar parceiros, usando fallback:", error);
      setPartners(defaultPartners);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleAddPartner = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPartnerFile || !newPartnerName) {
      toast.error("Nome e logo são obrigatórios.");
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', newPartnerName);
    formData.append('logoFile', newPartnerFile);

    try {
      await partnersAPI.create(formData);
      toast.success("Parceiro adicionado com sucesso!");
      setIsModalOpen(false);
      setNewPartnerName('');
      setNewPartnerFile(null);
      fetchPartners();
    } catch (error) {
      toast.error("Erro ao adicionar parceiro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja remover este parceiro?")) return;
    try {
      await partnersAPI.delete(id);
      toast.success("Parceiro removido com sucesso!");
      fetchPartners();
    } catch (error) {
      toast.error("Erro ao remover parceiro.");
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-brand-teal uppercase tracking-wider mb-2">
            <EditableText contentKey="partners.subheading" fallback="Confiança e Credibilidade" />
          </p>
          <h2 className="text-h2 text-brand-dark mb-4">
            <EditableText contentKey="partners.title" fallback="Empresas que Confiam na Gente" />
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            <EditableText contentKey="partners.description" fallback="Parceiros que escolheram a ContabilizeTech para impulsionar seus negócios com soluções contábeis e estratégicas de excelência." type="textarea" />
          </p>
          {isAdmin && isEditMode && (
            <Button onClick={() => setIsModalOpen(true)} className="mt-6 bg-brand-gradient">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Parceiro
            </Button>
          )}
        </div>

        <div className="relative group/slider">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {partners.map((partner) => (
                <div key={partner._id || partner.name} className="relative flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-6">
                  <div className="relative w-full h-40 flex items-center justify-center p-4 group">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      // REMOVIDO: grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100
                      className="transition-all duration-300" // Mantemos a transição caso queira adicionar outro hover futuramente
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {isAdmin && isEditMode && partner._id && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100"
                        onClick={() => handleDeletePartner(partner._id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button onClick={scrollPrev} disabled={prevBtnDisabled} className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-6 rounded-full h-12 w-12 opacity-0 group-hover/slider:opacity-100 transition-opacity z-20" size="icon">
            <ChevronLeft />
          </Button>
          <Button onClick={scrollNext} disabled={nextBtnDisabled} className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-6 rounded-full h-12 w-12 opacity-0 group-hover/slider:opacity-100 transition-opacity z-20" size="icon">
            <ChevronRight />
          </Button>
        </div>
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Parceiro</DialogTitle>
            <DialogDescription>
              Forneça o nome e o arquivo de imagem do logo do novo parceiro.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPartner} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="partnerName">Nome do Parceiro (para o 'alt' da imagem)</Label>
              <Input id="partnerName" value={newPartnerName} onChange={(e) => setNewPartnerName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="partnerLogo">Arquivo do Logo (PNG ou SVG transparente)</Label>
              <Input id="partnerLogo" type="file" accept="image/png, image/svg+xml" onChange={(e) => setNewPartnerFile(e.target.files?.[0] || null)} required />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Salvando...' : 'Salvar Parceiro'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}