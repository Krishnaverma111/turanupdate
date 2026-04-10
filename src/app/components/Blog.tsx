import { useRef, useState, useEffect } from 'react';
import { Play, Calendar, User } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swiper for Stack Effect
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

// --- CLOUDINARY ASSETS DATA ---
const blogPosts = [
  {
    id: 1,
    title: "Mastering the Signature Glow",
    category: "Tutorial",
    date: "May 10, 2024",
    author: "Tarun Kapoor",
    video: "https://res.cloudinary.com/dkvzrmzkl/video/upload/v1775715156/blog1_pdnaan.mov",
    type: 'video'
  },
  {
    id: 2,
    title: "Wedding Season Trends",
    category: "Bridal",
    date: "May 08, 2024",
    author: "Tarun Kapoor",
    image: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715141/_DSC7668.JPG_fbbyvv.jpg",
    type: 'image'
  },
  {
    id: 3,
    title: "Behind the Scenes: Celebrity Makeover",
    category: "BTS",
    date: "May 05, 2024",
    author: "Tarun Kapoor",
    video: "https://res.cloudinary.com/dkvzrmzkl/video/upload/v1775715160/Blog2_iijgv1.mov",
    type: 'video'
  },
  {
    id: 4,
    title: "Essential Skin Care Rituals",
    category: "Skin Care",
    date: "May 02, 2024",
    author: "Tarun Kapoor",
    image: "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715158/IMG_0158.JPG_bebb3u.jpg",
    type: 'image'
  }
];

interface BlogProps {
  isDark: boolean;
}

export function Blog({ isDark }: BlogProps) {
  const container = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Desktop/Tablet breakpoint adjusted
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const header = container.current?.querySelector(".blog-header");
    if (header) {
      gsap.fromTo(header, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: header, start: "top 90%" } }
      );
    }

    const cards = container.current?.querySelectorAll(".desktop-blog-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(cards, 
        { y: 100, opacity: 0, scale: 0.9, rotate: 2 },
        { 
          y: 0, opacity: 1, scale: 1, rotate: 0,
          duration: 1.5, stagger: 0.2, ease: "elastic.out(1, 0.75)",
          scrollTrigger: { trigger: container.current, start: "top 75%" } 
        }
      );
    }
  }, { scope: container, dependencies: [isDark, isMobile] });

  const BlogContent = ({ post, variant }: { post: any, variant: 'desktop' | 'mobile' }) => (
    <div
      className={`${variant === 'desktop' ? 'desktop-blog-card opacity-0' : 'mobile-blog-stack-card h-full w-full'} group relative overflow-hidden border ${
        isDark ? 'border-[#d4af37]/20 bg-black' : 'border-gray-200 bg-white shadow-xl'
      } transition-all duration-700 hover:border-[#d4af37] rounded-lg`}
    >
      <div className="aspect-[3/4] md:aspect-video relative overflow-hidden bg-black">
        {post.type === 'video' ? (
          <video 
            src={post.video} 
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
            muted
            loop
            onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
            onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
            autoPlay={variant === 'mobile'} // Mobile par preview ke liye autoPlay
            playsInline
          />
        ) : (
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700"
          />
        )}
        
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <span className="inline-block px-3 py-1 bg-[#d4af37] text-black text-[7px] md:text-[8px] tracking-[0.2em] font-bold uppercase mb-3 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {post.category}
            </span>
            <h3 className="text-lg md:text-3xl text-white font-serif italic mb-2 drop-shadow-md leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {post.title}
            </h3>
            <div className="flex items-center gap-3 text-[7px] md:text-[10px] tracking-widest uppercase opacity-60 text-white mt-3">
              <span className="flex items-center gap-1.5"><Calendar size={9} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><User size={9} /> {post.author}</span>
            </div>
        </div>

        {post.type === 'video' && variant === 'desktop' && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none group-hover:opacity-0 transition-opacity">
            <div className="w-12 h-12 border border-[#d4af37]/40 rounded-full flex items-center justify-center text-[#d4af37] backdrop-blur-sm">
              <Play size={18} fill="currentColor" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section 
      id="blog" 
      ref={container}
      className={`py-16 md:py-32 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-24 blog-header opacity-0">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 md:w-12 bg-[#d4af37]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.8em] text-[#d4af37] uppercase font-bold">Insights</span>
            <div className="h-[1px] w-8 md:w-12 bg-[#d4af37]" />
          </div>
          <h2 className="text-4xl md:text-7xl font-serif italic mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The <span className="text-[#d4af37]">Blog</span> & BTS
          </h2>
        </div>

        {isMobile ? (
          <div className="relative py-10">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay, Pagination]}
              className="blog-swiper w-[280px] sm:w-[320px] mx-auto !overflow-visible"
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ dynamicBullets: true, clickable: true }}
            >
              {blogPosts.map((post) => (
                <SwiperSlide key={post.id} className="rounded-xl overflow-hidden shadow-2xl">
                  <BlogContent post={post} variant="mobile" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="text-center mt-16 space-y-2">
                <p className="text-[8px] tracking-[0.4em] uppercase text-[#d4af37] animate-pulse">
                  Swipe To Explore
                </p>
                <div className="w-10 h-[1px] bg-[#d4af37]/30 mx-auto" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {blogPosts.map((post) => (
              <BlogContent key={post.id} post={post} variant="desktop" />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .blog-swiper .swiper-slide {
          background: transparent;
          border-radius: 12px;
        }
        .swiper-pagination-bullets {
          bottom: -40px !important;
        }
        .swiper-pagination-bullet {
          background: ${isDark ? '#555' : '#ccc'} !important;
        }
        .swiper-pagination-bullet-active {
          background: #d4af37 !important;
          width: 20px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </section>
  );
}