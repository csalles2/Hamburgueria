<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    emoji: "🍔",
    title: "Smash Clássico",
    description: "Pão brioche, burger 120g, queijo cheddar, picles, cebola roxa, molho da casa.",
    price: 22.90,
    quantity: 0
  },
  {
    id: 2,
    emoji: "🔥",
    title: "Smash Duplo Bacon",
    description: "Dois burgers 120g, cheddar duplo, bacon crocante, maionese defumada, pão brioche.",
    price: 29.90,
    quantity: 0
  },
  {
    id: 3,
    emoji: "🌶️",
    title: "Spicy Smash",
    description: "Burger 120g, cheddar, jalapeño, alface, molho picante especial.",
    price: 26.90,
    quantity: 0
  },
  {
    id: 4,
    emoji: "🥔",
    title: "Batata Rústica",
    description: "Batatas com casca, temperadas com páprica e alecrim.",
    price: 12.00,
    quantity: 0
  },
  {
    id: 5,
    emoji: "🥤",
    title: "Bebidas",
    description: "Refrigerante lata – R$ 6,00 | Água com gás – R$ 4,00",
    price: 6.00,
    quantity: 0
=======

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
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
  }
];

const Menu = () => {
<<<<<<< HEAD
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [selectedBeverage, setSelectedBeverage] = useState<'refrigerante' | 'agua' | null>(null);
  const navigate = useNavigate();

  const addToCart = (item: MenuItem) => {
    // Para bebidas, verifica qual foi selecionada
    if (item.id === 5 && !selectedBeverage) {
      alert('Selecione uma bebida primeiro');
      return;
    }

    const existingItem = cart.find(cartItem => 
      cartItem.id === item.id && 
      (item.id !== 5 || cartItem.title === getBeverageTitle())
    );

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === existingItem.id && 
        (item.id !== 5 || cartItem.title === getBeverageTitle())
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      const itemToAdd = item.id === 5 
        ? { ...item, title: getBeverageTitle(), price: getBeveragePrice() }
        : item;
      
      setCart([...cart, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number, itemTitle?: string) => {
    setCart(cart.filter(cartItem =>
      !(cartItem.id === itemId && (!itemTitle || cartItem.title === itemTitle))
    ));
  };

  const getBeverageTitle = () => {
    return selectedBeverage === 'refrigerante' ? 'Refrigerante Lata' : 
           selectedBeverage === 'agua' ? 'Água com Gás' : 'Bebida';
  };

  const getBeveragePrice = () => {
    return selectedBeverage === 'refrigerante' ? 6.00 : 4.00;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Adicione itens ao carrinho antes de fazer o pedido!');
      return;
    }
    
    // Salva o carrinho no localStorage para usar no Checkout
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

=======
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
  return (
    <section id="cardapio" className="py-20 bg-gradient-to-b from-smash to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Cardápio</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
        
<<<<<<< HEAD
        {/* Carrinho Flutuante */}
        {cart.length > 0 && (
          <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 max-w-xs">
            <h3 className="font-bold text-gray-800 mb-2">Seu Pedido</h3>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b">
                <span className="text-sm text-gray-600">
                  {item.title} x{item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.id, item.title)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2 font-bold">
              <span>Total:</span>
              <span>R$ {getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {menuItems.map((item, index) => (
            <div 
              key={item.id} 
              className="menu-item cursor-pointer hover:bg-gray-800 transition-colors duration-200 rounded-lg p-4"
              onClick={() => item.id !== 5 && addToCart(item)}
            >
=======
        <div className="max-w-3xl mx-auto">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
              <div className="flex-1">
                <h3 className="menu-title">
                  <span className="burger-emoji">{item.emoji}</span> {item.title}
                </h3>
                <p className="menu-description">{item.description}</p>
<<<<<<< HEAD
                
                {/* Seleção de Bebidas */}
                {item.id === 5 && (
                  <div className="mt-3 flex gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBeverage('refrigerante');
                        addToCart({...item, title: 'Refrigerante Lata', price: 6.00});
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm"
                    >
                      Refrigerante R$ 6,00
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBeverage('agua');
                        addToCart({...item, title: 'Água com Gás', price: 4.00});
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm"
                    >
                      Água com Gás R$ 4,00
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center md:justify-end gap-4">
                {item.price > 0 && item.id !== 5 && (
                  <p className="menu-price">R$ {item.price.toFixed(2)}</p>
                )}
                {item.id !== 5 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm"
                  >
                    Adicionar
                  </button>
                )}
=======
              </div>
              <div className="flex items-center md:justify-end">
                {item.price && <p className="menu-price">{item.price}</p>}
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
<<<<<<< HEAD
          <button 
            onClick={handleCheckout}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 text-lg"
          >
            🛒 FAZER PEDIDO ({getTotalItems()} itens)
          </button>
          {cart.length > 0 && (
            <p className="text-white mt-2">Total: R$ {getTotalPrice().toFixed(2)}</p>
          )}
=======
          <a 
            href="https://wa.me/5511999999999?text=Olá%2C+quero+fazer+um+pedido+na+Smash+House+🍔" 
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAZER PEDIDO AGORA
          </a>
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default Menu;
=======
export default Menu;
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
