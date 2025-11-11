
import { ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop')"
      }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-smash/80 z-0"></div>
      
      <div className="container mx-auto px-4 z-10 mt-[-40px]">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          <span className="text-smash-gold">SMASH</span> HOUSE
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Hambúrgueres artesanais feitos com paixão — do grill direto pra sua casa!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 

            href="" 

            href="https://wa.me/5511999999999?text=Olá%2C+quero+fazer+um+pedido+na+Smash+House+🍔" 

            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >

            <a href="#cardapio" style={{  }}>
             <ShoppingBag size={20} />
              
            </a>

            <ShoppingBag size={20} />
 6d23d566d0395f292d198045b326b87b3e56ecda
            FAZER PEDIDO AGORA
          </a>
          <a 
            href="#cardapio" 
            className="bg-black/40 hover:bg-black/60 text-white border border-smash-gold/30 font-bold py-3 px-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 text-lg"
          >
            VER CARDÁPIO
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
