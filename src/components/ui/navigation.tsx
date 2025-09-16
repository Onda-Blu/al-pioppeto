import { Button } from "@/components/ui/button";
import { Calendar, Car, CreditCard, Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CarWash Pro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#booking" className="text-muted-foreground hover:text-primary transition-colors">
              Book Now
            </a>
            <a href="#packages" className="text-muted-foreground hover:text-primary transition-colors">
              Packages
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="default" className="shadow-button">
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#booking" className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                Book Now
              </a>
              <a href="#packages" className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                Packages
              </a>
              <a href="#contact" className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="pt-2">
                <Button variant="default" className="w-full shadow-button">
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