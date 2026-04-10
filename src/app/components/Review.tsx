import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Swati Pandita",
    role: "Bridal Client",
    content: "Got my bridal makeup done from Tarun. Very professional behavior. The makeup was amazing. Minimal and subtle, exactly how I wanted. As a Kashmiri bride, he also helped me with tying of targa - the headgear. Highly recommended for bridal makeup.",
    rating: 5,
    date: "A week ago"
  },
  {
    id: 2,
    name: "Sonal Garg",
    role: "Regular Client",
    content: "I visited Mr. Tarun Kapoor saloon for makeup and the makeup was extremely amazing. I'm really impressed. Thank you so much Tarun sir and all the staff.",
    rating: 5,
    date: "4 weeks ago"
  },
  {
    id: 3,
    name: "Deepika",
    role: "Hair & Makeup Client",
    content: "I went to the Tarun Kapoor studio for my hair cut and makeup and the services are amazing. Staff is amazing. Thank you so much sir.",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Vishwajeet Bajwa",
    role: "Grooming Client",
    content: "Hie Tarun sir, your services are really amazing. Skin, hair, nail - everything is amazing.",
    rating: 5,
    date: "3 weeks ago"
  },
  {
    id: 5,
    name: "Simran Kaur",
    role: "Beauty Client",
    content: "Really nice experience. Bharti did a great job.",
    rating: 5,
    date: "3 weeks ago"
  }
];

export function Review({ isDark }: { isDark: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section id="reviews" className={`py-24 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] ${isDark ? 'bg-[#d4af37]/10' : 'bg-[#d4af37]/5'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] ${isDark ? 'bg-[#d4af37]/10' : 'bg-[#d4af37]/5'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#d4af37] text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-serif mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What Our Clients <span className="italic text-[#d4af37]">Say</span>
          </motion.h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50" />
        </div>

        <div className="relative h-[450px] md:h-[350px] max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
              className={`absolute w-full h-full flex flex-col items-center text-center p-8 md:p-12 rounded-2xl border ${
                isDark ? 'bg-zinc-900/50 border-[#d4af37]/20' : 'bg-gray-50 border-[#d4af37]/10'
              } backdrop-blur-sm shadow-2xl`}
            >
              <Quote className="text-[#d4af37] w-12 h-12 mb-8 opacity-40" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>

              <p className={`text-lg md:text-xl leading-relaxed italic mb-8 font-light ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                "{reviews[currentIndex].content}"
              </p>

              <div className="mt-auto">
                <h4 className={`text-lg font-bold tracking-widest uppercase mb-1 ${
                  isDark ? 'text-[#d4af37]' : 'text-[#8a6d3b]'
                }`}>
                  {reviews[currentIndex].name}
                </h4>
                <p className={`text-[10px] tracking-widest uppercase opacity-60 ${
                  isDark ? 'text-white' : 'text-gray-600'
                }`}>
                  {reviews[currentIndex].role} • {reviews[currentIndex].date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={prevReview}
              className={`p-4 rounded-full border transition-all duration-300 ${
                isDark ? 'border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10' : 'border-[#d4af37]/20 text-[#8a6d3b] hover:bg-[#d4af37]/5'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextReview}
              className={`p-4 rounded-full border transition-all duration-300 ${
                isDark ? 'border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10' : 'border-[#d4af37]/20 text-[#8a6d3b] hover:bg-[#d4af37]/5'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-32">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === currentIndex ? 'w-8 bg-[#d4af37]' : 'w-2 bg-gray-600/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
