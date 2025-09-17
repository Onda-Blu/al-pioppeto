import { Button } from "@/components/ui/button";
import { Calendar, Car, CreditCard, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/svgviewer-png-output.png";

export const Navigation = ({ onLoginClick, onBookNowClick }: { 
  onLoginClick?: () => void;
  onBookNowClick?: () => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#ab2020', fontFamily: 'Inter, Archivo, sans-serif' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-36 h-36 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-200 hover:text-[#AC1F32] transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
              Services
            </a>
            <button onClick={onBookNowClick} className="text-gray-200 hover:text-[#AC1F32] transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
              Book Now
            </button>
            <a href="#packages" className="text-gray-200 hover:text-[#AC1F32] transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
              Packages
            </a>
            <a href="#contact" className="text-gray-200 hover:text-[#AC1F32] transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
              Contact
            </a>
            <Button variant="default" className="shadow-button bg-[#AC1F32] text-white hover:bg-[#b11b2c]" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 600 }} onClick={onLoginClick}>
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-200 hover:text-[#AC1F32]"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border" style={{ backgroundColor: '#18181B', fontFamily: 'Inter, Archivo, sans-serif' }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="block px-3 py-2 text-gray-200 hover:text-[#AC1F32] transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                Services
              </a>
               <button onClick={onBookNowClick} className="block px-3 py-2 text-gray-200 hover:text-[#AC1F32] transition-colors w-full text-left" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                 Book Now
               </button>
              <a href="#packages" className="block px-3 py-2 text-gray-200 hover:text-[#AC1F32] transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                Packages
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-200 hover:text-[#AC1F32] transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                Contact
              </a>
              <div className="pt-2">
                <Button variant="default" className="w-full shadow-button bg-[#AC1F32] text-white hover:bg-[#b11b2c]" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 600 }} onClick={onLoginClick}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};