'use client';

import { useState } from 'react';
import { Play, Search, User, X, Images } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredContent, categories } from './data/content';

export default function CoupleFlix() {
  const [activeContent, setActiveContent] = useState<any>(null);

  const getGridCols = (length: number) => {
    if (length === 1) return 'grid-cols-1 max-w-sm mx-auto'; 
    if (length === 2 || length === 4) return 'grid-cols-1 sm:grid-cols-2';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden pb-20">
      
      {/* Navbar */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-black/90 to-transparent px-4 py-4 md:px-12 transition-all duration-300">
        <div className="text-2xl font-black tracking-tighter text-red-600">COUPLEFLIX</div>
        <div className="flex items-center gap-4 text-zinc-300">
          <Search className="h-5 w-5 cursor-pointer hover:text-white" />
          <User className="h-5 w-5 cursor-pointer hover:text-white" />
        </div>
      </nav>

      {/* Hero Section (ESKİ ORİJİNAL HALİNE DÖNDÜ: bg-center kullanıldı) */}
      <div className="relative h-[75vh] w-full">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${featuredContent.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        <div className="absolute bottom-[10%] left-0 px-4 md:px-12 w-full max-w-3xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">
            {featuredContent.title}
          </motion.h1>
          <p className="text-zinc-300 text-sm md:text-lg mb-6 line-clamp-3 drop-shadow-md">
            {featuredContent.description}
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveContent({ 
                title: featuredContent.title, 
                desc: featuredContent.description, 
                media: [{ type: 'video', url: featuredContent.videoUrl }] 
              })}
              className="flex items-center gap-2 rounded bg-white px-6 py-2 md:py-3 font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              <Play className="h-5 w-5 fill-current" /> Oynat
            </button>
          </div>
        </div>
      </div>

      {/* Kategoriler (DİKEY KALMAYA DEVAM EDİYOR) */}
      <div className="relative z-10 -mt-8 flex flex-col gap-8 px-4 md:px-12">
        {categories.map((category, index) => (
          <div key={index}>
            <h2 className="mb-3 text-lg md:text-xl font-semibold text-zinc-100">{category.title}</h2>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {category.items.map((item) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={item.id}
                  onClick={() => setActiveContent(item)}
                  className="group relative aspect-[9/16] w-36 md:w-48 flex-none cursor-pointer overflow-hidden rounded-xl bg-zinc-800 snap-center transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/50 shadow-lg"
                >
                  <img src={item.coverImg} alt={item.title} className="h-full w-full object-cover" />
                  
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-md px-2 py-1 flex items-center gap-1 text-xs font-medium border border-white/10">
                    <Images className="w-3 h-3" />
                    {item.media.length}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold truncate drop-shadow-md">
                    {item.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GALERİ MODALI */}
      <AnimatePresence>
        {activeContent && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-black/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-8"
          >
            <button 
              onClick={() => setActiveContent(null)}
              className="fixed right-4 top-4 sm:right-8 sm:top-8 z-50 rounded-full bg-zinc-800/80 p-3 text-white hover:bg-red-600 transition-colors backdrop-blur-md"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-full max-w-6xl mt-12 mb-8 text-center sm:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{activeContent.title}</h2>
              <p className="text-zinc-400 text-lg max-w-2xl">{activeContent.desc || activeContent.description}</p>
            </div>

            <div className={`w-full max-w-6xl grid gap-4 sm:gap-6 ${getGridCols(activeContent.media.length)}`}>
              {activeContent.media.map((item: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative w-full aspect-[9/16] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800/50 shadow-2xl"
                >
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt="Anı Fotoğrafı" 
                      className="absolute inset-0 w-full h-full object-contain bg-black/50" 
                    />
                  ) : (
                    <video 
                      src={item.url} 
                      controls 
                      autoPlay={idx === 0} 
                      className="absolute inset-0 w-full h-full object-contain bg-black/50"
                    >
                      Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="h-20 w-full flex-shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}