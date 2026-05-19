"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropertyHeroGalleryProps {
  images: string[];
  title: string;
  virtualTourUrl?: string | null;
}

export function PropertyHeroGallery({ images, title, virtualTourUrl }: PropertyHeroGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex] || images[0];

  const openGallery = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[60vh] md:h-[70vh]">
        <div
          className="lg:col-span-8 relative rounded-3xl overflow-hidden group cursor-zoom-in"
          role="button"
          tabIndex={0}
          aria-label={`Open gallery image 1 of ${images.length}`}
          onClick={() => openGallery(0)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openGallery(0);
            }
          }}
        >
          <Image src={images[0]} alt={title} fill className="object-cover" priority />
          {virtualTourUrl ? (
            <Button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                window.open(virtualTourUrl, "_blank", "noopener,noreferrer");
              }}
              className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border-none text-[#111111] font-bold rounded-full shadow-xl hover:bg-white"
            >
              <Video className="w-4 h-4 mr-2" /> Virtual Tour
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openGallery(0);
            }}
            variant="outline"
            className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border-none text-[#111111] font-bold rounded-xl shadow-xl"
          >
            <Maximize2 className="w-4 h-4 mr-2" /> View All Photos
          </Button>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => openGallery(1)}
            className="relative flex-1 rounded-3xl overflow-hidden text-left cursor-zoom-in"
            aria-label={`Open gallery image 2 of ${images.length}`}
          >
            <Image src={images[1] || images[0]} alt={`${title} detail 1`} fill className="object-cover" />
          </button>
          <button
            type="button"
            onClick={() => openGallery(2)}
            className="relative flex-1 rounded-3xl overflow-hidden text-left cursor-zoom-in"
            aria-label={`Open gallery image 3 of ${images.length}`}
          >
            <Image src={images[2] || images[0]} alt={`${title} detail 2`} fill className="object-cover" />
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black/95 z-[9999]" />
          <DialogContent className="fixed inset-0 z-[10000] flex flex-col items-center justify-center w-screen h-screen max-w-none m-0 p-0 border-none bg-transparent shadow-none !translate-x-0 !translate-y-0 !top-0 !left-0 [&>button:last-child]:hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>{title} gallery</DialogTitle>
              <DialogDescription>
                Fullscreen gallery view for {title}.
              </DialogDescription>
            </DialogHeader>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 left-6 text-white bg-black/50 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black/70 transition-colors z-[101]"
            >
              <ChevronLeft size={20} /> Back to gallery
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
              <div className="relative w-full h-full">
                <Image
                  src={activeImage}
                  alt={`${title} image ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={isOpen}
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
                    aria-label="Show previous image"
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
                    aria-label="Show next image"
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors backdrop-blur-sm z-[101]"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>

            <div className="absolute bottom-6 right-6 text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md text-sm font-medium z-[101]">
              {activeIndex + 1} / {images.length}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
