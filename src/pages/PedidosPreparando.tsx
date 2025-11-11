// src/components/PedidosAdmin.tsx
import React, { useState, useEffect } from 'react';

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

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  // Senha simples para acesso (em produção, use autenticação real)
  const SENHA_ADMIN = 'smash123';

  useEffect(() => {
    // Carrega pedidos do localStorage
    const pedidosSalvos = localStorage.getItem('pedidosAdmin');
    if (pedidosSalvos) {
      setPedidos(JSON.parse(pedidosSalvos));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha === SENHA_ADMIN) {
      setAutenticado(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const atualizarStatus = (pedidoId: string, novoStatus: Pedido['status']) => {
    const pedidosAtualizados = pedidos.map(pedido =>
      pedido.id === pedidoId ? { ...pedido, status: novoStatus } : pedido
    );
    setPedidos(pedidosAtualizados);
    localStorage.setItem('pedidosAdmin', JSON.stringify(pedidosAtualizados));
  };

  const calcularTempoEstimado = (status: string) => {
    switch (status) {
      case 'accepted': return '20-40 min';
      case 'preparing': return '15-30 min';
      case 'ready': return 'Pronto!';
      default: return '20-40 min';
    }
  };

  if (!autenticado) {
    return (
      <div style={{ 
        maxWidth: '400px', 
        margin: '100px auto', 
        padding: '40px', 
        backgroundColor: '#1f1f1f', 
        borderRadius: '8px',
        textAlign: 'center',
        color: '#f0f0f0'
      }}>
        <h2 style={{ color: '#ff9900', marginBottom: '20px' }}>Acesso Restrito</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#2c2c2c',
              color: '#f0f0f0'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#ff9900',
              color: '#121212',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Acessar Pedidos
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', minHeight: '100vh', color: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#ff9900' }}>🍔 Painel de Pedidos - Smash House</h1>
          <button
            onClick={() => setAutenticado(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sair
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              style={{
                backgroundColor: '#1f1f1f',
                padding: '20px',
                borderRadius: '8px',
                border: `2px solid ${
                  pedido.status === 'ready' ? '#00ff00' :
                  pedido.status === 'preparing' ? '#ff9900' :
                  pedido.status === 'accepted' ? '#0099ff' : '#666'
                }`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: '#ff9900', margin: '0 0 5px 0' }}>Pedido #{pedido.id}</h3>
                  <p style={{ margin: '2px 0', fontSize: '14px' }}>👤 {pedido.customerName}</p>
                  <p style={{ margin: '2px 0', fontSize: '14px' }}>📞 {pedido.phone}</p>
                  <p style={{ margin: '2px 0', fontSize: '14px' }}>
                    {pedido.deliveryOption === 'delivery' ? '🚚 Entrega' : '🏪 Retirada'}
                  </p>
                  {pedido.deliveryOption === 'delivery' && (
                    <p style={{ margin: '2px 0', fontSize: '12px', color: '#ccc' }}>📍 {pedido.address}</p>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    padding: '4px 8px',
                    backgroundColor:
                      pedido.status === 'ready' ? '#00ff00' :
                      pedido.status === 'preparing' ? '#ff9900' :
                      pedido.status === 'accepted' ? '#0099ff' : '#666',
                    color: '#121212',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {pedido.status === 'pending' && '⏳ Pendente'}
                    {pedido.status === 'accepted' && '✅ Aceito'}
                    {pedido.status === 'preparing' && '👨‍🍳 Preparando'}
                    {pedido.status === 'ready' && '🎉 Pronto'}
                  </div>
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>
                    ⏰ {calcularTempoEstimado(pedido.status)}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ color: '#ff9900', margin: '0 0 8px 0', fontSize: '14px' }}>Itens:</h4>
                {pedido.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #444', marginTop: '8px', paddingTop: '8px', fontWeight: 'bold' }}>
                  Total: R$ {pedido.total.toFixed(2)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => atualizarStatus(pedido.id, 'accepted')}
                  disabled={pedido.status !== 'pending'}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: pedido.status !== 'pending' ? '#333' : '#0099ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: pedido.status === 'pending' ? 'pointer' : 'not-allowed'
                  }}
                >
                  Aceitar
                </button>
                <button
                  onClick={() => atualizarStatus(pedido.id, 'preparing')}
                  disabled={pedido.status !== 'accepted'}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: pedido.status !== 'accepted' ? '#333' : '#ff9900',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: pedido.status === 'accepted' ? 'pointer' : 'not-allowed'
                  }}
                >
                  Preparar
                </button>
                <button
                  onClick={() => atualizarStatus(pedido.id, 'ready')}
                  disabled={pedido.status !== 'preparing'}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: pedido.status !== 'preparing' ? '#333' : '#00ff00',
                    color: '#121212',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: pedido.status === 'preparing' ? 'pointer' : 'not-allowed'
                  }}
                >
                  Pronto
                </button>
              </div>
            </div>
          ))}
        </div>

        {pedidos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <h3>Nenhum pedido recebido ainda</h3>
            <p>Os pedidos aparecerão aqui quando os clientes fizerem pedidos pelo site.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PedidosAdmin;