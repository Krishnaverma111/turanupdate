import { Menu, Phone, Sparkles, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import logo from './assets/Gemini_Generated_Image_rheieerheieerhei__1_-removebg-preview.png';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({ isDark, toggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(id, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.querySelector(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  // Header Animation Variants
  const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${scrolled
        ? isDark
          ? 'bg-black/90 backdrop-blur-xl py-2 border-[#d4af37]/30'
          : 'bg-white/90 backdrop-blur-xl py-2 border-[#d4af37]/20 shadow-sm'
        : 'bg-transparent py-4 border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center">

          <div className="flex-1 flex items-center gap-12">
            <motion.div variants={itemVariants} className="group cursor-pointer relative h-12 w-40 sm:w-56 md:w-64 lg:w-72">
              <img
                src={logo}
                alt="Tarun Kapoor Logo"
                className={`h-20 sm:h-28 md:h-36 lg:h-48 w-auto absolute ... top-1/2 left-0 -translate-y-1/2 transition-all duration-700 ${isDark ? 'brightness-110 contrast-110' : 'brightness-100'} hover:scale-110`}
              />
            </motion.div>

            <nav className="hidden lg:flex gap-8">
              {['Home', 'Services', 'Blog', 'Gallery', 'Reviews', 'About', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  variants={itemVariants}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                  className={`relative text-[11px] sm:text-xs md:text-sm tracking-[0.3em] uppercase transition-colors duration-500 group ${isDark ? 'text-gray-300 hover:text-[#d4af37]' : 'text-gray-700 hover:text-[#8a6d3b]'
                    }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-hover:w-full shadow-[0_0_8px_#d4af37]" />
                </motion.a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <motion.button
              variants={itemVariants}
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-500 border ${isDark ? 'border-[#d4af37]/20 hover:bg-[#d4af37]/10 text-[#d4af37]' : 'border-gray-200 hover:bg-gray-100 text-gray-600'
                }`}
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </motion.button>

            <motion.div variants={itemVariants} className="hidden md:flex xl:flex flex-col items-end">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Phone className="w-3 h-3" />
                <span className={`text-[9px] tracking-widest uppercase transition-colors duration-700 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Private Booking
                </span>
              </div>
              <span className={`text-xs font-light mt-0.5 transition-colors duration-700 ${isDark ? 'text-white/80' : 'text-gray-900'}`}>
                +91 89508 06703
              </span>
            </motion.div>

            <motion.button 
              variants={itemVariants} 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="relative flex sm:flex ... overflow-hidden border border-[#d4af37]/60 px-8 py-3 group transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a6d3b] to-[#d4af37] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className={`relative flex items-center gap-3 font-bold tracking-[0.2em] text-[10px] uppercase transition-colors duration-500 ${isDark ? 'text-[#d4af37] group-hover:text-black' : 'text-[#8a6d3b] group-hover:text-white'
                }`}>
                <Sparkles size={14} />
                <span>Reserve</span>
              </div>
            </motion.button>

            <motion.button
              variants={itemVariants}
              className={`lg:hidden p-2 transition-colors ${isDark ? 'text-[#d4af37]' : 'text-gray-800'}`}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Luxury Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed inset-0 z-[60] flex flex-col items-center justify-center ${
                isDark ? 'bg-black/95 backdrop-blur-2xl' : 'bg-white/95 backdrop-blur-2xl'
              }`}
            >
              <button 
                onClick={() => setMenuOpen(false)}
                className="absolute top-10 right-10 p-4 text-[#d4af37] active:scale-90 transition-transform"
              >
                <X size={32} strokeWidth={1} />
              </button>

              <div className="flex flex-col items-center gap-10">
                <div className="mb-12">
                   <img src={logo} alt="Logo" className="h-40 w-auto brightness-110" />
                </div>

                <nav className="flex flex-col items-center gap-8">
                  {['Home', 'Services', 'Gallery', 'Blog', 'Reviews', 'About', 'Contact'].map((item, idx) => (
                    <motion.a
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                      className={`text-2xl tracking-[0.4em] uppercase font-serif italic ${
                        isDark ? 'text-white hover:text-[#d4af37]' : 'text-black hover:text-[#8a6d3b]'
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </nav>

                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="mt-12 px-12 py-5 bg-[#d4af37] text-black font-bold tracking-[0.4em] uppercase text-[10px] shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  Reserve Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}