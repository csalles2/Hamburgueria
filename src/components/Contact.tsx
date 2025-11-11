
import { Phone, MapPin, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-smash to-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Contato</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-smash-gold/20 hover:border-smash-gold/40 transition-all duration-300 group">
            <div className="flex justify-center mb-4">
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-black/50 rounded-full text-primary group-hover:text-white group-hover:bg-primary transition-all duration-300"
              >
                <Phone size={30} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">WhatsApp</h3>
            <p className="text-gray-300">
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-smash-gold transition-colors"
              >
                (11) 99999-9999
              </a>
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-smash-gold/20 hover:border-smash-gold/40 transition-all duration-300 group">
            <div className="flex justify-center mb-4">
              <a 
                href="https://maps.app.goo.gl/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-black/50 rounded-full text-primary group-hover:text-white group-hover:bg-primary transition-all duration-300"
              >
                <MapPin size={30} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Endereço</h3>
            <p className="text-gray-300">
              <a 
                href="https://maps.app.goo.gl/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-smash-gold transition-colors"
              >
                Rua dos Burgers, 123<br />São Paulo, SP
              </a>
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-smash-gold/20 hover:border-smash-gold/40 transition-all duration-300 group">
            <div className="flex justify-center mb-4">
              <a 
                href="https://instagram.com/smashhouseburguer" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-black/50 rounded-full text-primary group-hover:text-white group-hover:bg-primary transition-all duration-300"
              >
                <Instagram size={30} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Instagram</h3>
            <p className="text-gray-300">
              <a 
                href="https://instagram.com/smashhouseburguer" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-smash-gold transition-colors"
              >
                @smashhouseburguer
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
