import { Clock, Box } from "lucide-react";

const Hours = () => {
  return (
    // ⚠️ CORREÇÃO: Removida a linha duplicada da tag <section>
    <section id="horario" className="py-20 bg-gradient-to-b from-black to-smash"> 
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Horário de Funcionamento</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Horário de Atendimento */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-smash-gold/20">
            <div className="flex justify-center mb-4">
              <Clock size={48} className="text-smash-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Horário de Atendimento</h3>
            <p className="text-gray-300 text-lg">🕒 Segunda a domingo — 18h às 23h</p>
          </div>
          
          {/* Informações sobre Pedidos */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-smash-gold/20">
            <div className="flex justify-center mb-4">
              <Box size={48} className="text-smash-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Pedidos</h3>
            <p className="text-gray-300 text-lg">📦 Pedidos aceitos até 22h30</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hours;