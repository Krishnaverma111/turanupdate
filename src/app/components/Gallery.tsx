import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const galleryImages = [
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715160/IMG_0162.JPG_nsztni.jpg", title: 'Signature Makeover' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715150/about_duaznk.jpg", title: 'Bridal Excellence' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715145/8ea47a29-8f01-476d-8054-799dc5e46b68.jpg_pakbco.jpg", title: 'Couture Artistry' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715180/WhatsApp_Image_2026-04-08_at_12.33.15_Small_t3w6vy.png", title: 'Luxe Transformation' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715180/Tarun_Kapoor_1.JPG_lfz3iz.jpg", title: 'Royal Glamour' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715184/WhatsApp_Image_2026-04-08_at_12.33.20_Small_ttclvr.png", title: 'Ethereal Beauty' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715183/WhatsApp_Image_2026-04-08_at_12.33.19_Small_xplfca.png", title: 'Radiant Glow' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715177/IMG_5145.jpg_wutv4h.jpg", title: 'Modern Classic' },
  { url: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715158/DSC07386A.jpg_tcy5on.jpg", title: 'Signature Finish' },
];

interface GalleryProps {
  isDark: boolean;
}

export function Gallery({ isDark }: GalleryProps) {
  return (
    <section id="gallery" className={`py-16 md:py-32 overflow-hidden transition-colors duration-700 ${isDark ? 'bg-black text-white' : 'bg-[#fcfaf7] text-gray-900'}`}>
      
      {/* Title Section Same as before */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mb-16 text-center"
      >
        <span className="text-[10px] tracking-[0.8em] text-[#d4af37] uppercase font-bold mb-4 block">Visual Excellence</span>
        <h2 className="text-4xl md:text-7xl font-serif italic mb-6">The Gallery</h2>
        <div className="h-[1px] w-24 bg-[#d4af37] mx-auto opacity-50" />
      </motion.div>

      <div className="relative w-full">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          observer={true}           // Important: Image load hone pe swiper ko batata hai
          observeParents={true}     // Parent elements change hone pe refresh hota hai
          autoplay={{ 
            delay: 3500, 
            disableOnInteraction: false 
          }}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }, 
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: false,
          }}
          navigation={{
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
          }}
          pagination={{ clickable: true }}
          className="gallery-swiper !pb-24 !overflow-visible"
        >
          {galleryImages.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={`group relative aspect-[4/5] overflow-hidden rounded-xl border-[2px] transition-all duration-700
                ${isDark ? 'border-[#d4af37]/20 shadow-2xl' : 'border-black/5 shadow-lg'}
                hover:border-[#d4af37]
              `}>
                <img 
                  src={item.url} 
                  alt={item.title}
                  loading="eager" // Important: Forced loading
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center z-10">
                  <Maximize2 className="text-[#d4af37] mb-4 w-8 h-8" />
                  <p className="text-white tracking-[0.5em] uppercase text-[10px] font-bold">
                    {item.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 z-50 justify-between px-10 pointer-events-none">
          <button className="gallery-prev pointer-events-auto w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] bg-black/20 backdrop-blur-md hover:bg-[#d4af37] hover:text-black transition-all">
            <ChevronLeft size={20} />
          </button>
          <button className="gallery-next pointer-events-auto w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] bg-black/20 backdrop-blur-md hover:bg-[#d4af37] hover:text-black transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .gallery-swiper .swiper-slide {
          filter: blur(4px) scale(0.85);
          opacity: 0.4;
          transition: all 0.8s ease;
        }
        .gallery-swiper .swiper-slide-active {
          filter: blur(0px) scale(1.05);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #d4af37 !important;
        }
      `}</style>
    </section>
  );
}