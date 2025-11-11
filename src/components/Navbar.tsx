<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Pedido {
  id: string;
  customerName: string;
  phone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered';
  deliveryOption: 'delivery' | 'pickup';
  address: string;
  paymentMethod: string;
  createdAt: Date;
}

const Navbar = () => {
  const [showAcompanhamento, setShowAcompanhamento] = useState(false);
  const [phone, setPhone] = useState('');
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para rolar até a seção
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Fecha o modal de acompanhamento se estiver aberto
    setShowAcompanhamento(false);
  };

  const buscarPedido = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    
    // Simula busca (em produção seria API)
    setTimeout(() => {
      const pedidos = JSON.parse(localStorage.getItem('pedidosAdmin') || '[]');
      const pedidosDoCliente = pedidos.filter((p: Pedido) => 
        p.phone.replace(/\D/g, '').includes(phone.replace(/\D/g, ''))
      ).sort((a: Pedido, b: Pedido) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      if (pedidosDoCliente.length > 0) {
        setPedido(pedidosDoCliente[0]);
      } else {
        alert('Nenhum pedido encontrado para este telefone.');
        setPedido(null);
      }
      setLoading(false);
    }, 1000);
  };

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.acompanhamento-container') && !target.closest('.acompanhamento-trigger')) {
        setShowAcompanhamento(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Atualizar pedido em tempo real quando aberto
  useEffect(() => {
    if (!showAcompanhamento || !pedido) return;

    const interval = setInterval(() => {
      buscarPedido();
    }, 10000); // Atualiza a cada 10 segundos

    return () => clearInterval(interval);
  }, [showAcompanhamento, pedido]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { texto: '⏳ Recebido', cor: '#666' };
      case 'accepted':
        return { texto: '✅ Aceito', cor: '#0099ff' };
      case 'preparing':
        return { texto: '👨‍🍳 Preparando', cor: '#ff9900' };
      case 'ready':
        return { texto: '🎉 Pronto!', cor: '#00ff00' };
      default:
        return { texto: '📦 Entregue', cor: '#00cc00' };
    }
  };

  const getStatusDescricao = (status: string) => {
    switch (status) {
      case 'pending': return 'Aguardando confirmação';
      case 'accepted': return 'Pedido confirmado';
      case 'preparing': return 'Sendo preparado';
      case 'ready': return 'Pronto para entrega/retirada';
      default: return 'Pedido finalizado';
    }
  };

  return (
    <nav style={{
      backgroundColor: '#121212',
      padding: '1rem 2rem',
      borderBottom: '2px solid #ff9900',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            color: '#ff9900',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          SMASHHOUSE
        </Link>

        {/* Menu de Navegação */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Sobre */}
          <button
            onClick={() => scrollToSection('sobre')}
            style={{
              background: 'none',
              border: 'none',
              color: '#f0f0f0',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0'
            }}
          >
            Sobre
          </button>

          {/* Cardápio */}
          <button
            onClick={() => scrollToSection('cardapio')}
            style={{
              background: 'none',
              border: 'none',
              color: '#f0f0f0',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0'
            }}
          >
            Cardápio
          </button>

          {/* Horários */}
          <button
            onClick={() => scrollToSection('horarios')}
            style={{
              background: 'none',
              border: 'none',
              color: '#f0f0f0',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0'
            }}
          >
            Horários
          </button>

          {/* Contato */}
          <button
            onClick={() => scrollToSection('contato')}
            style={{
              background: 'none',
              border: 'none',
              color: '#f0f0f0',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0'
            }}
          >
            Contato
          </button>

          {/* Botão de Acompanhamento */}
          <button
            className="acompanhamento-trigger"
            onClick={() => setShowAcompanhamento(!showAcompanhamento)}
            style={{
              backgroundColor: '#ff9900',
              color: '#121212',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            📱 Acompanhar
          </button>

          {/* Botão Fazer Pedido */}
          <Link 
            to="/checkout" 
            style={{
              backgroundColor: '#ff9900',
              color: '#121212',
              padding: '0.5rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            🍔 Pedir
          </Link>
        </div>
      </div>

      {/* Modal de Acompanhamento */}
      {showAcompanhamento && (
        <div 
          className="acompanhamento-container"
          style={{
            position: 'absolute',
            top: '100%',
            right: '2rem',
            width: '400px',
            backgroundColor: '#1f1f1f',
            border: '2px solid #ff9900',
            borderRadius: '8px',
            padding: '1.5rem',
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}
        >
          <h3 style={{ color: '#ff9900', margin: '0 0 1rem 0', textAlign: 'center' }}>
            📱 Acompanhe Seu Pedido
          </h3>

          {!pedido ? (
            // Formulário de busca
            <form onSubmit={buscarPedido}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Digite seu telefone"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#2c2c2c',
                  color: '#f0f0f0',
                  fontSize: '14px'
                }}
                required
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: loading ? '#666' : '#ff9900',
                  color: '#121212',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? '🔍 Buscando...' : '🔍 Buscar Pedido'}
              </button>
            </form>
          ) : (
            // Display do pedido encontrado
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #333'
              }}>
                <div>
                  <h4 style={{ color: '#ff9900', margin: '0 0 0.25rem 0' }}>
                    Pedido #{pedido.id}
                  </h4>
                  <p style={{ margin: '0', fontSize: '12px', color: '#ccc' }}>
                    {pedido.customerName}
                  </p>
                </div>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getStatusInfo(pedido.status).cor,
                  color: '#121212',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {getStatusInfo(pedido.status).texto}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '13px' }}>
                  <strong>Status:</strong> {getStatusDescricao(pedido.status)}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '13px' }}>
                  <strong>Entrega:</strong> {pedido.deliveryOption === 'delivery' ? '🚚 Delivery' : '🏪 Retirada'}
                </p>
                <p style={{ margin: '0', fontSize: '13px' }}>
                  <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    navigate(`/acompanhar-pedido/${pedido.id}`);
                    setShowAcompanhamento(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    backgroundColor: '#ff9900',
                    color: '#121212',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📊 Ver Detalhes
                </button>
                <button
                  onClick={() => {
                    setPedido(null);
                    setPhone('');
                  }}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#666',
                    color: '#f0f0f0',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Nova Busca
                </button>
              </div>
            </div>
          )}

          {/* Link para página completa */}
          <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #333' }}>
            <button
              onClick={() => {
                navigate('/acompanhar-pedido');
                setShowAcompanhamento(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff9900',
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              📋 Acessar página completa de acompanhamento
            </button>
=======

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
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
          </div>
        </div>
      )}
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
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
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
