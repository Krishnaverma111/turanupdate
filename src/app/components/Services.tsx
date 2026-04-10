import { useRef, useState, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, CheckCircle2, Sparkles, 
  Crown, Flower, Scissors, Zap, Star, UserCheck, Heart 
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swiper for Blog
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

// Asset Imports
import srv1 from './assets/05BB60AC-83F7-449F-8AE2-032938B87203.JPG.jpeg';
import srv2 from './assets/5741879D-51E2-4C22-B15B-8605BC36344B.JPG.jpeg';
import srv3 from './assets/C6AC9FF7-300C-4FDF-9D53-16E030FE03C9.JPG.jpeg';
import srv4 from './assets/6e8e96f1-2491-4f1b-88ab-7995165b4e9c.jpg';
import srv5 from './assets/IMG_4206.JPG';
import srv6 from './assets/IMG_4356.JPG';
import srv7 from './assets/571DCF73-0DF4-4FFF-A805-408AA1C131B5.PNG';
import srv8 from './assets/6A6600CE-BE4D-493F-8A73-8E7ED6D68072.PNG';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Couture Makeup", category: "Bridal & Guest", icon: Crown, img: srv1 },
  { title: "Artistic Facials", category: "Skin Care", icon: Flower, img: srv2 },
  { title: "Precision Hair Cut", category: "Styling", icon: Scissors, img: srv3 },
  { title: "Radiance Room", category: "Specialty", icon: Zap, img: srv4 },
  { title: "Hair Texture", category: "Treatments", icon: Star, img: srv5 },
  { title: "Groom Makeup", category: "Men", icon: UserCheck, img: srv6 },
  { title: "Pre-Bridal Ritual", category: "Ritual", icon: Heart, img: srv7 },
  { title: "Signature Groom", category: "Ritual", icon: Sparkles, img: srv8 }
];

const blogPosts = [
  { id: 1, title: "Mastering the Signature Glow", category: "Tutorial", image: srv1, type: 'image' },
  { id: 2, title: "Wedding Season Trends", category: "Bridal", image: srv2, type: 'image' },
  { id: 3, title: "Behind the Scenes", category: "BTS", image: srv7, type: 'image' },
];

interface Props { isDark: boolean; }

export function Services({ isDark }: Props) {
  const [status, setStatus] = useState('idle');
  const [isMobile, setIsMobile] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    gsap.from(".animate-up", {
      y: 40, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out",
      scrollTrigger: { trigger: ".animate-up", start: "top 90%" }
    });
    
    gsap.to(marqueeRef1.current, { x: "-50%", duration: 40, ease: "none", repeat: -1 });
    gsap.to(marqueeRef2.current, { x: "+=50%", duration: 40, ease: "none", repeat: -1, startAt: { x: "-50%" } });
  }, { scope: container });

  const handleContactSubmit = (e: any, method: 'whatsapp' | 'email') => {
    e.preventDefault();
    const form = document.querySelector('#contact-form') as HTMLFormElement;
    if(!form.checkValidity()) return form.reportValidity();
    
    const formData = new FormData(form);
    const bodyMsg = `*Inquiry*\n*Name:* ${formData.get('name')}\n*Ritual:* ${formData.get('ritual')}\n*Message:* ${formData.get('message')}`;
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/918950806703?text=${encodeURIComponent(bodyMsg)}`, '_blank');
      setStatus('whatsapp');
    } else {
      window.location.href = `mailto:kapoortarun8@gmail.com?subject=Inquiry&body=${encodeURIComponent(bodyMsg)}`;
      setStatus('email');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  const ServiceCard = ({ service }: { service: any }) => (
    <div className={`flex-shrink-0 w-[260px] md:w-[320px] h-[360px] md:h-[420px] mx-3 md:mx-4 relative rounded-xl overflow-hidden border-2 transition-all duration-500 ${
      isDark ? 'border-[#d4af37]/20 hover:border-[#d4af37]' : 'border-gray-100 hover:border-[#d4af37]'
    } group cursor-pointer`}>
      {/* Mobile-Friendly Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 opacity-50 md:opacity-60 group-hover:opacity-20 transition-opacity" />
      <img 
        src={service.img} 
        className="absolute inset-0 w-full h-full object-cover brightness-[1.05] md:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" 
        alt={service.title} 
      />
      <div className="absolute bottom-6 left-6 z-20">
        <div className="flex items-center gap-2 mb-2">
          <service.icon size={14} className="text-[#d4af37]" />
          <span className="text-[8px] text-[#d4af37] tracking-[0.3em] font-bold uppercase">{service.category}</span>
        </div>
        <h3 className="text-xl text-white font-serif italic drop-shadow-md">{service.title}</h3>
      </div>
    </div>
  );

  return (
    <div ref={container} className={`${isDark ? "bg-black text-white" : "bg-[#fcfaf7] text-gray-900"}`}>
      
      {/* --- SERVICES SECTION --- */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="text-center mb-16 animate-up px-6">
          <h2 className="text-4xl md:text-8xl font-serif italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The <span className="text-[#d4af37]">Masterpiece</span> Collection
          </h2>
        </div>
        <div className="flex mb-8 overflow-hidden whitespace-nowrap">
          <div ref={marqueeRef1} className="flex">
            {[...services, ...services].map((s, i) => <ServiceCard key={i} service={s} />)}
          </div>
        </div>
        <div className="flex overflow-hidden whitespace-nowrap">
          <div ref={marqueeRef2} className="flex">
            {[...services, ...services].map((s, i) => <ServiceCard key={i} service={s} />)}
          </div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section className="py-20 bg-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-up">
            <h2 className="text-4xl md:text-6xl font-serif italic">Journal & <span className="text-[#d4af37]">BTS</span></h2>
          </div>
          {isMobile ? (
            <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards, Autoplay]} className="w-[280px]" autoplay={{ delay: 3000 }}>
              {blogPosts.map((post) => (
                <SwiperSlide key={post.id} className="rounded-2xl overflow-hidden bg-black border border-[#d4af37]/20">
                  <img src={post.image} className="aspect-[3/4] w-full h-full object-cover opacity-80" alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#d4af37]/20">
                  <img src={post.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt="" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

     
    </div>
  );
}