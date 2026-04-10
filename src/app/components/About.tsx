import { Award, Users, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { ImageWithFallback } from './figma/ImageWithFallback';

// Asset Import
import aboutImg from './assets/about.jpeg';

const stats = [
  { icon: Award, number: '15+', label: 'Years of Artistry' },
  { icon: Users, number: '10K+', label: 'Elite Clientele' },
  { icon: Clock, number: '24/7', label: 'Concierge' },
  { icon: Heart, number: '100%', label: 'Pure Excellence' }
];

interface AboutProps {
  isDark: boolean;
}

export function About({ isDark }: AboutProps) {
  // Entrance Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants: any = {
    hidden: { y: 25, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="about" 
      className={`py-16 md:py-32 transition-colors duration-700 overflow-hidden ${
        isDark ? 'bg-black text-white' : 'bg-[#fafafa] text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- Left Side: Content --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="order-2 lg:order-1"
          >
            {/* 1. Subtitle Line with Pulse Loop */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  width: { duration: 1 },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="h-[1px] bg-[#d4af37]"
              />
              <motion.span 
                variants={itemVariants}
                className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-[#d4af37] uppercase font-bold"
              >
                The Master Artist
              </motion.span>
            </div>

            {/* 2. Heading with Glow Loop */}
            <div className="overflow-hidden mb-6 md:mb-8">
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-6xl leading-tight" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Meet <br /> 
                <motion.span 
                  animate={{ opacity: [0.8, 1, 0.8], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-[#8a6d3b] via-[#d4af37] to-[#f9f295] bg-clip-text text-transparent inline-block"
                >
                  TARUN KAPOOR
                </motion.span>
              </motion.h2>
            </div>

            {/* 3. Paragraphs */}
            <motion.p 
              variants={itemVariants}
              className={`mb-6 leading-relaxed text-xs md:text-sm tracking-wide font-light ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`} 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Tarun Kapoor is the most renowned and celebrated makeup artist in Karnal, Haryana, and North India. 
              With over 23 years of profound experience, he has transformed the art of makeup into a medium of 
              luxury and self-expression.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className={`mb-10 md:mb-12 leading-relaxed text-xs md:text-sm tracking-wide font-light ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`} 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Established his signature makeover studio in 2024, Tarun continues to lead the industry 
              with his innovative techniques and timeless aesthetic sense, making every client feel 
              like royalty.
            </motion.p>

            {/* 5. Stats Grid */}
            <motion.div 
              variants={containerVariants} 
              className="grid grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, borderColor: '#d4af37' }}
                  className={`p-6 md:p-8 border transition-all duration-500 rounded-none group ${
                    isDark ? 'bg-white/[0.02] border-white/10 hover:shadow-[0_15px_30px_rgba(212,175,55,0.1)]' 
                           : 'bg-white border-gray-100 shadow-sm hover:shadow-xl'
                  }`}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                  >
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37] mb-3 md:mb-4 transition-transform group-hover:scale-110" />
                  </motion.div>
                  <div className="text-2xl md:text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {stat.number}
                  </div>
                  <div className="text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em] text-[#d4af37] uppercase font-bold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* 6. Button */}
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-8 py-4 md:px-10 md:py-4 border transition-all duration-500 overflow-hidden ${
                isDark ? 'border-[#d4af37] text-[#d4af37]' : 'border-gray-900 text-gray-900'
              }`}
            >
              <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out ${
                isDark ? 'bg-[#d4af37]' : 'bg-gray-900'
              }`} />
              <span className={`relative z-10 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-bold uppercase transition-colors duration-500 ${
                isDark ? 'group-hover:text-black' : 'group-hover:text-white'
              }`}>
                Explore Legacy
              </span>
            </motion.button>
          </motion.div>

          {/* --- Right Side: Image with Animated Frame --- */}
          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative group"
          >
            {/* Moving Gold Frame Loop */}
            <motion.div 
              animate={{ x: [16, 4, 16], y: [16, 28, 16], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 border border-[#d4af37]/20 z-0"
            />
            
            <div className="relative overflow-hidden border border-[#d4af37]/30 z-10 shadow-2xl">
              <ImageWithFallback
                src={aboutImg}
                alt="Tarun Kapoor Portfolio"
                className="w-full h-[650px] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[2.5s] scale-110 group-hover:scale-100"
              />
              <div className={`absolute inset-0 transition-opacity duration-1000 ${
                isDark ? 'bg-black/30 group-hover:bg-transparent' : 'bg-[#d4af37]/5 group-hover:bg-transparent'
              }`} />
            </div>

            {/* Glowing Corners Loop */}
            <motion.div 
              animate={{ boxShadow: ["0 0 10px #d4af3744", "0 0 20px #d4af37", "0 0 10px #d4af3744"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#d4af37] -mr-2 -mt-2 z-20" 
            />
            <motion.div 
              animate={{ boxShadow: ["0 0 10px #d4af3744", "0 0 20px #d4af37", "0 0 10px #d4af3744"] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#d4af37] -ml-2 -mb-2 z-20" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}