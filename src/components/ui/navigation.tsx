import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';
import { Calendar, Car, CreditCard, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/al-pioppeto-logo.png";

export const Navigation = ({ onBookNowClick }: { onBookNowClick?: () => void }) => {
  const { signOut } = useClerk();
  const handleLogout = async () => {
    await signOut();
    window.location.href = '/al-pioppeto/';
  };
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-primary" style={{ fontFamily: 'Inter, Archivo, sans-serif' }}>
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
            {isSignedIn && user?.primaryEmailAddress?.emailAddress && (
              <div className="flex items-center gap-2">
                <span className="text-primary-foreground font-semibold bg-accent/10 px-3 py-1 rounded-full">
                  {user.primaryEmailAddress.emailAddress}
                </span>
                <a
                  href="#"
                  className="text-accent text-xs underline hover:text-accent/80 transition"
                  style={{ color: '#ffb700' }}
                  onClick={e => { e.preventDefault(); handleLogout(); }}
                >
                  Log out
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary-foreground hover:text-accent"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-primary/95 backdrop-blur-sm" style={{ fontFamily: 'Inter, Archivo, sans-serif' }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                Services
              </a>
               <button onClick={onBookNowClick} className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors w-full text-left" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                 Book Now
               </button>
              <a href="#packages" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                Packages
              </a>
              <a href="#contact" className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors" style={{ fontFamily: 'Inter, Archivo, sans-serif', fontWeight: 500 }}>
                Contact
              </a>
              <div className="pt-2">
                {isSignedIn && user?.primaryEmailAddress?.emailAddress && (
                  <div className="flex items-center gap-2">
                    <span className="block px-3 py-2 text-primary-foreground font-semibold bg-accent/10 rounded-full">
                      {user.primaryEmailAddress.emailAddress}
                    </span>
                    <a
                      href="#"
                      className="text-accent text-xs underline hover:text-accent/80 transition"
                      style={{ color: '#ffb700' }}
                      onClick={e => { e.preventDefault(); handleLogout(); }}
                    >
                      Log out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};