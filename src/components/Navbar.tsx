
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-smash-gold/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-smash-gold text-2xl md:text-3xl font-bold tracking-tighter">
                SMASH HOUSE
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-smash-gold"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-smash-gold/20 backdrop-blur-md py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLinks mobile={true} />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const linkClass = mobile
    ? "block py-2 text-white hover:text-smash-gold transition-colors"
    : "text-white hover:text-smash-gold transition-colors";

  return (
    <>
      <a href="#sobre" className={linkClass}>
        Sobre
      </a>
      <a href="#cardapio" className={linkClass}>
        Cardápio
      </a>
      <a href="#horario" className={linkClass}>
        Horários
      </a>
      <a href="#contato" className={linkClass}>
        Contato
      </a>
      <a 
        href="https://wa.me/5511999999999?text=Olá%2C+quero+fazer+um+pedido+na+Smash+House+🍔" 
        className="bg-primary px-4 py-2 rounded-full text-white font-medium hover:bg-primary/80 transition-colors flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ShoppingBag size={18} className="mr-1" /> Pedir
      </a>
    </>
  );
};

export default Navbar;
