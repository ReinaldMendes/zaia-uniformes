"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";

const portfolioItems = [
  { id: 1, image: "/img/portfolio/1.jpg" },
  { id: 2, image: "/img/portfolio/2.jpg" },
  { id: 3, image: "/img/portfolio/3.jpg" },
  { id: 4, image: "/img/portfolio/4.jpg" },
  { id: 5, image: "/img/portfolio/5.jpg" },
  { id: 6, image: "/img/portfolio/6.jpg" },
];

export function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detectar se estamos no desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const visibleItems = isDesktop ? 3 : 1;
  const maxIndex = Math.max(0, portfolioItems.length - visibleItems);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  return (
    <section id="portfolio" className="py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 uppercase tracking-tighter">
            <EditableText
              contentKey="portfolio.title"
              fallback="Portfólio de Elite"
              as="span"
            />
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto italic font-medium">
            <EditableText
              contentKey="portfolio.description"
              fallback="Arraste para conhecer as soluções entregues em Ponta Grossa e região."
              type="textarea"
              as="span"
            />
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center py-12">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute -left-8 md:left-0 z-20 bg-[#1E3A5F] text-white p-3 rounded-full hover:bg-[#2F5F8F] transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slides Container */}
          {isDesktop ? (
            /* Desktop: múltiplas imagens lado a lado */
            <div className="relative w-full max-w-6xl overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
              >
                {portfolioItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-80 h-96 rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <EditableImage
                      contentKey={`portfolio.${item.id}.image`}
                      fallback={item.image}
                      alt={`Portfolio item ${item.id}`}
                      width={320}
                      height={384}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Mobile: uma imagem por vez */
            <div className="relative w-full max-w-3xl overflow-hidden">
              <div className="flex justify-center items-center h-96">
                {portfolioItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute w-80 h-96 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform ${
                      index === currentIndex
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-75 z-0"
                    }`}
                  >
                    <EditableImage
                      contentKey={`portfolio.${item.id}.image`}
                      fallback={item.image}
                      alt={`Portfolio item ${item.id}`}
                      width={320}
                      height={384}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute -right-8 md:right-0 z-20 bg-[#1E3A5F] text-white p-3 rounded-full hover:bg-[#2F5F8F] transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#1E3A5F] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
