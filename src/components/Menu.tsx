
const menuItems = [
  {
    emoji: "🍔",
    title: "Smash Clássico",
    description: "Pão brioche, burger 120g, queijo cheddar, picles, cebola roxa, molho da casa.",
    price: "R$ 22,90"
  },
  {
    emoji: "🔥",
    title: "Smash Duplo Bacon",
    description: "Dois burgers 120g, cheddar duplo, bacon crocante, maionese defumada, pão brioche.",
    price: "R$ 29,90"
  },
  {
    emoji: "🌶️",
    title: "Spicy Smash",
    description: "Burger 120g, cheddar, jalapeño, alface, molho picante especial.",
    price: "R$ 26,90"
  },
  {
    emoji: "🥔",
    title: "Batata Rústica",
    description: "Batatas com casca, temperadas com páprica e alecrim.",
    price: "R$ 12,00"
  },
  {
    emoji: "🥤",
    title: "Bebidas",
    description: "Refrigerante lata – R$ 6,00 | Água com gás – R$ 4,00",
    price: ""
  }
];

const Menu = () => {
  return (
    <section id="cardapio" className="py-20 bg-gradient-to-b from-smash to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Cardápio</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
        <div className="max-w-3xl mx-auto">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="flex-1">
                <h3 className="menu-title">
                  <span className="burger-emoji">{item.emoji}</span> {item.title}
                </h3>
                <p className="menu-description">{item.description}</p>
              </div>
              <div className="flex items-center md:justify-end">
                {item.price && <p className="menu-price">{item.price}</p>}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://wa.me/5511999999999?text=Olá%2C+quero+fazer+um+pedido+na+Smash+House+🍔" 
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAZER PEDIDO AGORA
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;
