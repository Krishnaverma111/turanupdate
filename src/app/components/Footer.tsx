import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export function Footer({ isDark }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className={`py-16 md:py-24 border-t ${
      isDark ? 'bg-black border-[#d4af37]/10 text-white' : 'bg-[#fcfaf7] border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          
          {/* 1. Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              TARUN <span className="text-[#d4af37]">KAPOOR</span>
            </h2>
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-60 font-medium">
              Celebrity Makeovers & Academy
            </p>
            <div className="flex gap-6 pt-4">
              <a 
                href="https://www.instagram.com/tarunkapoormakeupartist?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d4af37] hover:scale-110 transition-transform"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://share.google/2WKEkpxA3bwzit19z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d4af37] hover:scale-110 transition-transform"
              >
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" className="text-[#d4af37] hover:scale-110 transition-transform"><Youtube size={20} /></a>
              <a href="https://wa.me/918901306703" target="_blank" className="text-[#d4af37] hover:scale-110 transition-transform"><MessageCircle size={20} /></a>
            </div>
          </div>

          {/* 2. Contact & Location Detail */}
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-[#d4af37]">
                <MapPin size={18} className="animate-pulse" />
                <h4 className="text-[11px] tracking-[0.2em] font-bold uppercase">Our Studio</h4>
              </div>
              <a 
                href="https://maps.app.goo.gl/TREirxGEmeSbviAR6" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs leading-relaxed block max-w-[250px] transition-colors hover:text-[#d4af37] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Shop no.9, Main Market, Sukhan Market, <br />
                Model Town, Karnal, Haryana 132001
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 group">
                <Phone size={12} className="text-[#d4af37]" />
                <a href="tel:+918901306703" className="text-xs tracking-widest">+91 89013 06703</a>
              </div>
              <div className="flex items-center justify-center gap-2 group">
                <Mail size={12} className="text-[#d4af37]" />
                <a href="mailto:kapoortarun8@gmail.com" className="text-xs tracking-widest lowercase opacity-70">kapoortarun8@gmail.com</a>
              </div>
            </div>
          </div>

          {/* 3. Credits & Legal */}
          <div className="flex flex-col items-center md:items-end space-y-4 md:text-right">
            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 italic">Since 2024</p>
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold">© {currentYear} All Rights Reserved</p>
            </div>
            <div className="pt-4 border-t border-[#d4af37]/20 w-full md:w-auto">
              <p className="text-[9px] tracking-[0.3em] uppercase opacity-50">
                Made with passion by <span className="text-[#d4af37] font-bold"><a href="https://dikota-all.vercel.app/">DIKOTA</a></span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}