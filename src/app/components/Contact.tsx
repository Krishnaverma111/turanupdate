import { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Sparkles, Send } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  isDark: boolean;
}

export function Contact({ isDark }: ContactProps) {
  const container = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'whatsapp' | 'email'>('idle');

  const contactInfo = [
    { icon: MapPin, title: 'The Workshop', content: 'Shop #9, Sukhan Market, Main Market\nModel Town, Karnal 132001' },
    { icon: Phone, title: 'Connect', content: '+91 89013 06703' },
    { icon: Mail, title: 'Digital Desk', content: 'kapoortarun8@gmail.com' },
    { icon: Clock, title: 'Hours', content: 'Mon - Sun: 10AM - 8PM\nOpen All Days' }
  ];

  useGSAP(() => {
    const header = container.current?.querySelector(".contact-header");
    const formItems = container.current?.querySelectorAll(".form-item");
    const infoCards = container.current?.querySelectorAll(".info-card");
    const flyingIcons = container.current?.querySelectorAll(".flying-icon");

    if (header) {
      gsap.fromTo(header, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: header, start: "top 95%" }
      });
    }

    if (formItems && formItems.length > 0) {
      gsap.fromTo(formItems, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%"
        }
      });

      // 🔥 ADD THIS LINE EXACTLY HERE
      gsap.set(formItems, { opacity: 1 });
    }

    flyingIcons?.forEach((icon: any) => {
      gsap.to(icon, {
        x: "random(-60, 60)", y: "random(-60, 60)", duration: "random(6, 12)",
        repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true
      });
    });

    infoCards?.forEach((card: any, i: number) => {
      gsap.to(card, {
        y: "-=8", duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut", delay: i * 0.2
      });
    });
  }, { scope: container, dependencies: [isDark] });

  const handleAction = (method: 'whatsapp' | 'email') => {
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      ritual: formData.get('ritual'),
      message: formData.get('message'),
      email: formData.get('email'),
    };

    setStatus('sending');
    const bodyMsg = `✨ New Inquiry from Website ✨\n\n👤 Name: ${data.name}\n📧 Email: ${data.email}\n💄 Ritual: ${data.ritual}\n💬 Message: ${data.message}`;

    setTimeout(() => {
      if (method === 'whatsapp') {
        window.open(`https://wa.me/918901306703?text=${encodeURIComponent(bodyMsg)}`, '_blank');
        setStatus('whatsapp');
      } else {
        const subject = `New Inquiry: ${data.ritual} - ${data.name}`;
        window.location.href = `mailto:kapoortarun8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyMsg)}`;
        setStatus('email');
      }
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section ref={container} id="contact" className={`py-20 md:py-32 relative transition-colors duration-700 overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-[#fcfaf7] text-gray-900'}`}>

      <div className="absolute inset-0 pointer-events-none opacity-[0.1]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flying-icon absolute text-[#d4af37]" style={{ top: `${20 * i}%`, left: `${15 * i}%` }}>
            <Sparkles size={15 + i * 10} strokeWidth={0.5} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24 contact-header">
          <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase font-bold block mb-4">Get In Touch</span>
          <h2 className="text-5xl md:text-8xl font-serif italic mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The Connection
          </h2>
          <div className="h-[1px] w-24 bg-[#d4af37]/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          <div className={`p-8 md:p-12 border backdrop-blur-sm transition-all duration-500 ${isDark ? 'bg-white/[0.03] border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
            {status !== 'idle' && status !== 'sending' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-[450px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-[#d4af37]" />
                </div>
                <h3 className="text-3xl font-serif italic text-[#d4af37] mb-2">Thank You</h3>
                <p className="text-sm opacity-60 tracking-widest uppercase">Redirecting to {status}...</p>
              </motion.div>
            ) : (
              <form ref={formRef} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="form-item group">
                    <label className="text-[10px] tracking-[0.2em] font-bold text-[#d4af37] block mb-2">FULL NAME</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Tarun Kapoor"
                      className={`w-full bg-transparent border-b py-3 outline-none transition-all focus:border-[#d4af37] text-sm placeholder:opacity-100 ${isDark
                          ? 'border-white/10 text-white placeholder:text-gray-500'
                          : 'border-black/10 text-black placeholder:text-gray-400'
                        }`}
                    />
                  </div>
                  <div className="form-item opacity-0">
                    <label className="text-[10px] tracking-[0.2em] font-bold text-[#d4af37] block mb-2">EMAIL ADDRESS</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="hello@gmail.com"
                      className={`w-full bg-transparent border-b py-3 outline-none transition-all focus:border-[#d4af37] text-sm placeholder:opacity-100 ${isDark
                          ? 'border-white/10 text-white placeholder:text-gray-500'
                          : 'border-black/10 text-black placeholder:text-gray-400'
                        }`}
                    />
                  </div>
                </div>

                <div className="form-item opacity-0">
                  <label className="text-[10px] tracking-[0.2em] font-bold text-[#d4af37] block mb-2">SELECT SERVICE</label>
                  <select
                    name="ritual"
                    required
                    className={`w-full bg-transparent border-b py-3 outline-none cursor-pointer focus:border-[#d4af37] text-sm ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'
                      }`}
                  >
                    <option value="" disabled selected className={isDark ? "bg-black text-gray-500" : "bg-white text-gray-400"}>Choose a Ritual</option>
                    <option value="Bridal Makeup" className={isDark ? "bg-black text-white" : "bg-white text-black"}>Bridal Makeup Ritual</option>
                    <option value="Celebrity Makeover" className={isDark ? "bg-black text-white" : "bg-white text-black"}>Celebrity Makeover</option>
                    <option value="Academy Inquiry" className={isDark ? "bg-black text-white" : "bg-white text-black"}>Academy / Workshop</option>
                    <option value="Groom Package" className={isDark ? "bg-black text-white" : "bg-white text-black"}>Groom Styling</option>
                  </select>
                </div>

                <div className="form-item opacity-0">
                  <label className="text-[10px] tracking-[0.2em] font-bold text-[#d4af37] block mb-2">YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    placeholder="How can we help you look your best?"
                    rows={2}
                    className={`w-full bg-transparent border-b py-3 outline-none resize-none transition-all focus:border-[#d4af37] text-sm placeholder:opacity-100 ${isDark
                        ? 'border-white/10 text-white placeholder:text-gray-500'
                        : 'border-black/10 text-black placeholder:text-gray-400'
                      }`}
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button type="button" onClick={() => handleAction('whatsapp')} disabled={status === 'sending'}
                    className="flex-1 bg-[#d4af37] py-5 text-black font-bold tracking-[0.3em] text-[10px] uppercase transition-all hover:bg-[#b8962d] active:scale-95 flex items-center justify-center gap-3">
                    {status === 'sending' ? 'Processing...' : <><Send size={14} /> WhatsApp</>}
                  </button>

                  <button type="button" onClick={() => handleAction('email')} disabled={status === 'sending'}
                    className={`flex-1 border border-[#d4af37] py-5 font-bold tracking-[0.3em] text-[10px] uppercase transition-all active:scale-95 flex items-center justify-center gap-3 ${isDark ? 'text-[#d4af37] hover:bg-[#d4af37] hover:text-black' : 'text-black hover:bg-black hover:text-white'}`}>
                    <Mail size={14} /> Email Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
            {contactInfo.map((info, i) => (
              <div key={i} className={`info-card p-8 border group flex flex-col items-center text-center transition-all duration-500 ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-[#d4af37]/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
                <div className="w-12 h-12 border border-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37] mb-6 group-hover:bg-[#d4af37] group-hover:text-black transition-all duration-500">
                  <info.icon size={20} strokeWidth={1} />
                </div>
                <h4 className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-bold mb-4">{info.title}</h4>
                <p className={`text-xs md:text-sm font-light whitespace-pre-line leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}