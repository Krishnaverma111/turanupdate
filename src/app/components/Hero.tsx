import { ArrowRight, Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isDark: boolean;
}

export function Hero({ isDark }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLElement>(null);

  // URLs
  const bannerVidUrl = "https://res.cloudinary.com/dkvzrmzkl/video/upload/v1775715155/Banner_n8bk58.mov";
  const mobileImgUrl = "https://res.cloudinary.com/dkvzrmzkl/image/upload/v1775715181/WhatsApp_Image_2026-04-08_at_12.33.19_1_Small_nl03en.png";

  // 1. Precise Screen Size Check
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // 2. Fix Desktop Autoplay (Browser Policy Handling)
  useEffect(() => {
    if (!isMobile && videoRef.current) {
      videoRef.current.muted = true; // Autoplay requires mute
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocks autoplay, show the play button
          setIsPlaying(false);
        });
      }
    }
  }, [isMobile]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Entrance Animation
    tl.fromTo(".hero-bg",
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, ease: "expo.out" }
    );

    const elements = container.current?.querySelectorAll('.hero-animate');
    if (elements) {
      tl.fromTo(elements,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
        "-=1.5"
      );
    }

    // Scroll Parallax logic
    gsap.to(".hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <section ref={container} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isMobile ? (
          <img
            src={mobileImgUrl}
            alt="Tarun Kapoor"
            className="hero-bg w-full h-full object-cover filter brightness-110 contrast-110"
          />
        ) : (
          <video
            ref={videoRef}
            src={bannerVidUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hero-bg w-full h-full object-cover transform origin-center filter brightness-110 saturate-110"
          />
        )}

        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="flex flex-col items-center">
          <h2
            className="hero-animate text-5xl sm:text-6xl md:text-9xl mb-6 md:mb-8 tracking-[0.10em] font-bold bg-gradient-to-b from-[#f9f295] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent drop-shadow-2xl opacity-0"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            TARUN <br className="md:hidden" /> KAPOOR
          </h2>

          <p className="hero-animate text-[10px] sm:text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto text-white font-light tracking-[0.3em] leading-relaxed opacity-0 uppercase px-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Celebrity Makeup Artist <br />
            <span className="italic text-[#d4af37] tracking-[0.2em]">Karnal | Haryana</span>
          </p>

          <div className="hero-animate opacity-0">
            <button 
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative overflow-hidden bg-[#d4af37] text-black px-12 py-5 font-bold tracking-[0.4em] transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            >
              <span className="relative z-10 text-[10px] flex items-center gap-4">
                BOOK SESSION <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Controls - Shown only on Desktop */}
      {!isMobile && (
        <div className="hero-animate absolute bottom-10 left-10 flex items-center gap-6 opacity-0">
          <button
            onClick={toggleVideo}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-1" />}
          </button>
          <span className="text-[8px] tracking-[0.5em] text-gray-500 uppercase">Cinema Mode</span>
        </div>
      )}

      {/* Scroll Line Indicator */}
      <div className="hero-animate absolute bottom-10 right-10 flex flex-col items-end gap-4 opacity-0 z-10">
        <div className="h-24 w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent" />
        <p className="text-[9px] tracking-[0.3em] text-gray-500 uppercase rotate-90 origin-right translate-y-4">Scroll</p>
      </div>
    </section>
  );
}