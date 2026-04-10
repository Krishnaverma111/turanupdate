import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Review } from './components/Review';
import { CursorTrail } from './components/CursorTrail';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => setIsDark(!isDark);

  // Layout Refresh on Theme Change (Important to prevent cuts)
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [isDark]);

  useGSAP(() => {
    // 1. Smooth Scroll Handling
    // Section pinning for Contact
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top top",
      pin: false,
      pinSpacing: true, // true rakhein taaki footer ke liye space bache
      anticipatePin: 1, // Pinning start hone se pehle smoother transition ke liye
    });

    // 2. Global Scroll Refresh
    // Jab gallery ya images load hon, layout refresh hona chahiye
    window.addEventListener('load', () => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, { scope: mainRef });

  return (
    
    <div 
      ref={mainRef} 
      className={`min-h-screen transition-colors duration-700 overflow-x-hidden ${
        isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-gray-900'
      }`}
    >
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Container to prevent horizontal cut-offs */}
      <main className="relative w-full">
        
        {/* All sections wrapped in divs with unique IDs */}
        <section id="hero">
          <Hero isDark={isDark} />
        </section>

        <section id="services">
          <Services isDark={isDark} />
        </section>

        <section id="gallery">
          <Gallery isDark={isDark} />
        </section>

        <section id="blog">
          <Blog isDark={isDark} />
        </section>

        <Review isDark={isDark} />

        <section id="about">
          <About isDark={isDark} />
        </section>
        
        {/* Contact Section - GSAP Pin Trigger */}
        <section id="contact" className="w-full min-h-screen">
          <Contact isDark={isDark} />
        </section>
        <div className="relative">
      <CursorTrail />
      {/* Rest of your components like Header, Hero, Gallery, Footer */}
    </div>
      </main>

      <Footer isDark={isDark} />
      
      {/* Force ScrollTrigger update if layout shifts */}
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        /* Fix for Swiper/GSAP overlap */
        .pin-spacer {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}