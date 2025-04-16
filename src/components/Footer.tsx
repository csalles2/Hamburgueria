
import { ShoppingBag, Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">
              <span className="text-smash-gold">SMASH</span> HOUSE
            </h2>
            <p className="text-gray-400 mt-2">Hambúrgueres artesanais feitos com paixão</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <a 
              href="https://wa.me/5511999999999" 
              className="flex items-center gap-2 hover:text-smash-gold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={18} />
              <span>(11) 99999-9999</span>
            </a>
            
            <a 
              href="https://instagram.com/smashhouseburguer" 
              className="flex items-center gap-2 hover:text-smash-gold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} />
              <span>@smashhouseburguer</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Smash House Burger. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
