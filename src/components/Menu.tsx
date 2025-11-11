import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react'; // Importei o ícone ShoppingBag (exemplo)

interface MenuItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  price: number;
  quantity: number; // Necessário para o estado 'cart'
}

// ⚠️ LISTA DE ITENS CORRIGIDA E UNIFICADA
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
    price: 6.00, // Preço base (mas será sobrescrito ao adicionar)
    quantity: 0
  }
];
// FIM DA LISTA DE ITENS

const Menu = () => {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [selectedBeverage, setSelectedBeverage] = useState<'refrigerante' | 'agua' | null>(null);
  const navigate = useNavigate();

  // Função auxiliar para obter título da bebida selecionada
  const getBeverageTitle = () => {
    return selectedBeverage === 'refrigerante' ? 'Refrigerante Lata' :
      selectedBeverage === 'agua' ? 'Água com Gás' : 'Bebida';
  };

  // Função auxiliar para obter preço da bebida selecionada
  const getBeveragePrice = () => {
    return selectedBeverage === 'refrigerante' ? 6.00 : 4.00;
  };

  // Lógica de adição ao carrinho
  const addToCart = (item: MenuItem, beverageChoice?: 'refrigerante' | 'agua') => {
    // Para bebidas (id 5), trata a escolha
    if (item.id === 5 && !beverageChoice && !selectedBeverage) {
      alert('Selecione uma bebida primeiro');
      return;
    }
    
    // Define o título e preço para bebidas, permitindo itens únicos
    const itemTitle = item.id === 5 ? (beverageChoice === 'refrigerante' ? 'Refrigerante Lata' : 'Água com Gás') : item.title;
    const itemPrice = item.id === 5 ? (beverageChoice === 'refrigerante' ? 6.00 : 4.00) : item.price;


    const existingItem = cart.find(cartItem =>
      cartItem.id === item.id && cartItem.title === itemTitle
    );

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === existingItem.id && cartItem.title === itemTitle
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      const itemToAdd = { ...item, title: itemTitle, price: itemPrice, quantity: 1 };
      setCart([...cart, itemToAdd]);
    }
  };

  // Remove um item (ou tipo de bebida) do carrinho
  const removeFromCart = (itemId: number, itemTitle?: string) => {
    // Filtra o item específico (incluindo o título para bebidas)
    setCart(cart.filter(cartItem =>
      !(cartItem.id === itemId && (!itemTitle || cartItem.title === itemTitle))
    ));
  };

  // Cálculo de itens totais no carrinho
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Cálculo do preço total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Navegação para o checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Adicione itens ao carrinho antes de fazer o pedido!');
      return;
    }
    // Salva o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };


  return (
    <section id="cardapio" className="py-20 bg-gradient-to-b from-smash to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Cardápio</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>

        {/* Carrinho Flutuante (Opcional, se o botão FAZER PEDIDO não for suficiente) */}
        {cart.length > 0 && (
          <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 max-w-xs">
            <h3 className="font-bold text-gray-800 mb-2">Seu Pedido</h3>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b">
                <span className="text-sm text-gray-600">
                  {item.title} x{item.quantity}
                </span>
                {/* Remove o item exato, usando o título para bebidas */}
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
              <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="menu-item" // Usando a classe Tailwind que você definiu
            >
              <div className="flex-1">
                <h3 className="menu-title">
                  <span className="burger-emoji">{item.emoji}</span> {item.title}
                </h3>
                <p className="menu-description">{item.description}</p>

                {/* Seleção de Bebidas */}
                {item.id === 5 && (
                  <div className="mt-3 flex gap-4">
                    {/* Botão Refrigerante */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 'refrigerante'); // Passa a escolha da bebida
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm"
                    >
                      Refrigerante R$ 6,00
                    </button>
                    {/* Botão Água */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 'agua'); // Passa a escolha da bebida
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm"
                    >
                      Água com Gás R$ 4,00
                    </button>
                  </div>
                )}
              </div>

              {/* Preço e Botão Adicionar (para itens normais) */}
              <div className="flex items-center md:justify-end gap-4 mt-2 md:mt-0">
                {/* Mostra preço para itens normais */}
                {item.id !== 5 && (
                  <>
                    <p className="menu-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que o clique no botão ative o clique no div pai
                        addToCart(item);
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm"
                    >
                      Adicionar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botões de Ação Final */}
        <div className="text-center mt-12">

          {/* Botão Checkout (interno) */}
          <button
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 text-lg"
          >
            <ShoppingBag size={20} /> FAZER PEDIDO ({getTotalItems()} itens)
          </button>
          
          {cart.length > 0 && (
            <p className="text-white mt-2 font-bold text-xl">Total: R$ {getTotalPrice().toFixed(2).replace('.', ',')}</p>
          )}

          {/* Botão WhatsApp (externo) - Mantido, mas não recomendado junto com o Checkout interno */}
          {/*
          <a
            href="https://wa.me/5511999999999?text=Olá%2C+quero+fazer+um+pedido+na+Smash+House+🍔"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 text-lg mt-4 ml-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            FAZER PEDIDO AGORA (WhatsApp)
          </a>
          */}

        </div>
      </div>
    </section>
  );
};

export default Menu;