import React, { useState, useMemo, useEffect } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface CheckoutData {
    address: string;
    paymentMethod: 'pix' | 'card_machine' | 'cash';
    changeNeeded?: number;
    deliveryOption: 'delivery' | 'pickup';
    customerName: string;
    phone: string;
}

interface PedidosProps {
    cartItems: CartItem[];
    onPlaceOrder: (data: CheckoutData) => void;
}

// Valores fixos para simulação
const DELIVERY_FEE = 10.00; 

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para enviar mensagem no WhatsApp
const sendWhatsAppMessage = (phone: string, message: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/55${formattedPhone}?text=${encodedMessage}`, '_blank');
};

const Pedidos: React.FC<PedidosProps> = ({ cartItems, onPlaceOrder }) => {
    // Estados do Formulário
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState<CheckoutData['paymentMethod']>('pix');
    const [changeNeeded, setChangeNeeded] = useState('');
    const [notes, setNotes] = useState('');
    const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    
    // Estados do fluxo do pedido
    const [orderStatus, setOrderStatus] = useState<'pending' | 'accepted' | 'preparing' | 'ready'>('pending');
    const [orderId, setOrderId] = useState<string>('');

    // Calcula Subtotal e Total Geral
    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);
    
    const total = subtotal + (deliveryOption === 'delivery' ? DELIVERY_FEE : 0);

    // Simula o processo do pedido
    useEffect(() => {
        if (orderStatus === 'accepted') {
            const timer = setTimeout(() => {
                setOrderStatus('preparing');
                // Envia mensagem de "preparando"
                sendWhatsAppMessage(phone, `🔄 SEU PEDIDO ESTÁ SENDO PREPARADO!\n\nPedido: #${orderId}\nItens: ${cartItems.map(item => `${item.name} x${item.quantity}`).join(', ')}\nTotal: ${formatCurrency(total)}\n\nAguarde, em breve estará pronto! 🍔`);
            }, 5000);
            return () => clearTimeout(timer);
        }

        if (orderStatus === 'preparing') {
            const timer = setTimeout(() => {
                setOrderStatus('ready');
                // Envia mensagem de "pronto"
                sendWhatsAppMessage(phone, `✅ SEU PEDIDO ESTÁ PRONTO!\n\nPedido: #${orderId}\n${deliveryOption === 'delivery' ? '📦 Entregaremos em breve!' : '🏪 Pode retirar na loja!'}\n\nAgradecemos pela preferência! 🎉`);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [orderStatus, orderId, phone, cartItems, total, deliveryOption]);

    // Lógica de Submissão do Formulário
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();

            if (cartItems.length === 0) {
                alert('Seu carrinho está vazio. Adicione itens para continuar.');
                return;
            }
            if (!customerName) {
                alert('Por favor, preencha seu nome.');
                return;
            }
            if (!phone) {
                alert('Por favor, preencha seu telefone.');
                return;
            }
            if (deliveryOption === 'delivery' && !address) {
                alert('Por favor, preencha o endereço de entrega.');
                return;
            }

            const orderData: CheckoutData = {
                address: deliveryOption === 'delivery' ? address : 'Retirada na loja',
                paymentMethod: payment,
                changeNeeded: payment === 'cash' ? parseFloat(changeNeeded) : undefined,
                deliveryOption,
                customerName,
                phone
            };

            // Gera um ID único para o pedido
            const newOrderId = 'SMH' + Date.now().toString().slice(-6);
            setOrderId(newOrderId);

            // Salva o pedido no localStorage para o admin
            const novoPedido = {
                id: newOrderId,
                customerName,
                phone,
                items: cartItems,
                total: total,
                status: 'pending' as const,
                deliveryOption,
                address: deliveryOption === 'delivery' ? address : 'Retirada na loja',
                paymentMethod: payment === 'pix' ? 'PIX' : payment === 'card_machine' ? 'Cartão' : 'Dinheiro',
                createdAt: new Date()
            };

            // Salva no localStorage para o admin
            const pedidosExistentes = JSON.parse(localStorage.getItem('pedidosAdmin') || '[]');
            localStorage.setItem('pedidosAdmin', JSON.stringify([...pedidosExistentes, novoPedido]));

            // Envia mensagem de pedido aceito com tempo estimado
            const orderSummary = cartItems.map(item => 
                `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
            ).join('\n');

            const message = `✅ PEDIDO ACEITO - SMASH HOUSE!\n\nPedido: #${newOrderId}\nCliente: ${customerName}\nTelefone: ${phone}\n\n${deliveryOption === 'delivery' ? `📍 Endereço: ${address}` : '🏪 Retirada na loja'}\n\n📋 ITENS:\n${orderSummary}\n\n${deliveryOption === 'delivery' ? `🚚 Taxa de entrega: R$ 10,00` : ''}\n💰 TOTAL: R$ ${total.toFixed(2)}\n\n💳 Forma de pagamento: ${payment === 'pix' ? 'PIX' : payment === 'card_machine' ? 'Cartão' : 'Dinheiro'}${payment === 'cash' && orderData.changeNeeded ? `\n💵 Troco para: R$ ${orderData.changeNeeded.toFixed(2)}` : ''}\n\n⏰ TEMPO ESTIMADO: 20-40 minutos\n\nAcompanhe seu pedido pelo nosso site!`;

            sendWhatsAppMessage(phone, message);

            // Atualiza status
            setOrderStatus('accepted');

            // Chama a função passada via prop para finalizar
            onPlaceOrder(orderData);
        };

        // E atualize as mensagens do useEffect:
        useEffect(() => {
            if (orderStatus === 'accepted') {
                const timer = setTimeout(() => {
                    setOrderStatus('preparing');
                    // Envia mensagem de "preparando" com tempo atualizado
                    sendWhatsAppMessage(phone, `🔄 SEU PEDIDO ESTÁ SENDO PREPARADO!\n\nPedido: #${orderId}\nItens: ${cartItems.map(item => `${item.name} x${item.quantity}`).join(', ')}\nTotal: R$ ${total.toFixed(2)}\n\n⏰ TEMPO ESTIMADO: 15-30 minutos\n\nEstamos preparando seu pedido com todo cuidado! 👨‍🍳`);
                }, 10000); // 10 segundos para demo (em produção seria 5-10 minutos)
                return () => clearTimeout(timer);
            }

            if (orderStatus === 'preparing') {
                const timer = setTimeout(() => {
                    setOrderStatus('ready');
                    // Envia mensagem de "pronto"
                    sendWhatsAppMessage(phone, `✅ SEU PEDIDO ESTÁ PRONTO!\n\nPedido: #${orderId}\n${deliveryOption === 'delivery' ? '📦 Entregaremos em breve!' : '🏪 Pode retirar na loja!'}\n\n💰 Valor total: R$ ${total.toFixed(2)}\n\nObrigado pela preferência! 🎉\nVolte sempre! 🍔`);
                }, 15000); // 15 segundos para demo (em produção seria 15-25 minutos)
                return () => clearTimeout(timer);
            }
        }, [orderStatus, orderId, phone, cartItems, total, deliveryOption]);

    // Tela de status do pedido
    if (orderStatus !== 'pending') {
        return (
            <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#121212', color: '#f0f0f0', textAlign: 'center' }}>
                <h1 style={{ color: '#ff9900', marginBottom: '30px' }}>Acompanhe seu Pedido</h1>
                
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ color: '#ff9900' }}>Pedido #{orderId}</h2>
                    <p>Cliente: {customerName}</p>
                    <p>Telefone: {phone}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            backgroundColor: orderStatus === 'accepted' ? '#ff9900' : '#333',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            margin: '0 auto 10px'
                        }}>
                            {orderStatus === 'accepted' && '✅'}
                        </div>
                        <span>Pedido Aceito</span>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            backgroundColor: orderStatus === 'preparing' ? '#ff9900' : orderStatus === 'ready' ? '#ff9900' : '#333',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            margin: '0 auto 10px'
                        }}>
                            {(orderStatus === 'preparing' || orderStatus === 'ready') && '👨‍🍳'}
                        </div>
                        <span>Preparando</span>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            backgroundColor: orderStatus === 'ready' ? '#ff9900' : '#333',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            margin: '0 auto 10px'
                        }}>
                            {orderStatus === 'ready' && '🎉'}
                        </div>
                        <span>Pronto</span>
                    </div>
                </div>

                {orderStatus === 'accepted' && (
                    <div style={{ backgroundColor: '#1f1f1f', padding: '20px', borderRadius: '8px' }}>
                        <h3 style={{ color: '#ff9900' }}>🔄 Fazendo seu pedido...</h3>
                        <p>Seu pedido foi aceito e está sendo preparado!</p>
                    </div>
                )}

                {orderStatus === 'preparing' && (
                    <div style={{ backgroundColor: '#1f1f1f', padding: '20px', borderRadius: '8px' }}>
                        <h3 style={{ color: '#ff9900' }}>👨‍🍳 Preparando pedido...</h3>
                        <p>Nossos chefs estão trabalhando no seu pedido!</p>
                    </div>
                )}

                {orderStatus === 'ready' && (
                    <div style={{ backgroundColor: '#1f1f1f', padding: '20px', borderRadius: '8px', border: '2px solid #ff9900' }}>
                        <h3 style={{ color: '#ff9900', fontSize: '24px' }}>🎉 PEDIDO PRONTO!</h3>
                        <p>{deliveryOption === 'delivery' ? '📦 Entregaremos em breve!' : '🏪 Pode retirar na loja!'}</p>
                        <p style={{ marginTop: '10px' }}>Obrigado pela preferência! 🍔</p>
                    </div>
                )}
            </div>
        );
    }

    // Formulário original de checkout
    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', backgroundColor: '#121212', color: '#f0f0f0' }}>
            
            <h1 style={{ color: '#ff9900', borderBottom: '2px solid #ff9900', paddingBottom: '10px', marginBottom: '30px' }}>
                Finalizar Pedido
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '40px' }}>
                
                {/* BLOCO 1: DADOS DO CLIENTE E ENTREGA */}
                <div style={{ flex: 2 }}>
                    
                    {/* Dados do Cliente */}
                    <h2 style={{ color: '#ff9900' }}>1. Seus Dados</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Nome Completo:</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                            style={inputStyle}
                            placeholder="Seu nome completo"
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Telefone (WhatsApp):</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            style={inputStyle}
                            placeholder="(11) 99999-9999"
                        />
                    </div>

                    {/* Opção de Entrega/Retirada */}
                    <h2 style={{ color: '#ff9900', marginTop: '30px' }}>2. Como vai receber?</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                        <label style={radioLabelStyle}>
                            <input 
                                type="radio" 
                                name="delivery" 
                                value="delivery" 
                                checked={deliveryOption === 'delivery'} 
                                onChange={() => setDeliveryOption('delivery')} 
                            />
                            🚚 Entrega (Taxa de R$ 10,00)
                        </label>
                        
                        <label style={radioLabelStyle}>
                            <input 
                                type="radio" 
                                name="delivery" 
                                value="pickup" 
                                checked={deliveryOption === 'pickup'} 
                                onChange={() => setDeliveryOption('pickup')} 
                            />
                            🏪 Retirar na Loja (Sem taxa)
                        </label>
                    </div>

                    {/* Endereço (apenas para entrega) */}
                    {deliveryOption === 'delivery' && (
                        <>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>Endereço Completo (Rua, Número, Bairro, CEP):</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    style={inputStyle}
                                    placeholder="Ex: Rua das Flores, 123, Centro, CEP: 01234-567"
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>Observações (Opcional):</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    style={inputStyle}
                                    rows={3}
                                    placeholder="Ex: Tocar a campainha, carne bem passada..."
                                />
                            </div>
                        </>
                    )}

                    {/* Forma de Pagamento */}
                    <h2 style={{ color: '#ff9900', marginTop: '30px' }}>3. Forma de Pagamento</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                        
                        <label style={radioLabelStyle}>
                            <input type="radio" name="payment" value="pix" checked={payment === 'pix'} onChange={() => setPayment('pix')} />
                            PIX (Pagamento imediato)
                        </label>
                        
                        <label style={radioLabelStyle}>
                            <input type="radio" name="payment" value="card_machine" checked={payment === 'card_machine'} onChange={() => setPayment('card_machine')} />
                            Cartão na Maquineta (Crédito/Débito)
                        </label>
                        
                        <label style={radioLabelStyle}>
                            <input type="radio" name="payment" value="cash" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                            Dinheiro (Pagar na entrega/retirada)
                        </label>
                        
                        {payment === 'cash' && (
                            <div style={{ marginLeft: '25px', marginTop: '10px' }}>
                                <label style={labelStyle}>Precisa de Troco para (Opcional):</label>
                                <input
                                    type="number"
                                    value={changeNeeded}
                                    onChange={(e) => setChangeNeeded(e.target.value)}
                                    style={inputStyle}
                                    placeholder={formatCurrency(total + 5)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                {/* BLOCO 2: RESUMO DO PEDIDO */}
                <div style={{ flex: 1, backgroundColor: '#1f1f1f', padding: '20px', borderRadius: '8px', height: 'fit-content', border: '1px solid #333' }}>
                    <h2 style={{ margin: '0 0 20px 0', color: '#ff9900' }}>Resumo</h2>

                    {cartItems.map(item => (
                        <div key={item.id} style={summaryItemStyle}>
                            <span>{item.name} ({item.quantity}x)</span>
                            <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                    ))}

                    <div style={summaryStyle}>
                        <span>Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    
                    {deliveryOption === 'delivery' && (
                        <div style={summaryStyle}>
                            <span>Taxa de Entrega:</span>
                            <span>{formatCurrency(DELIVERY_FEE)}</span>
                        </div>
                    )}

                    <div style={totalStyle}>
                        <span>TOTAL A PAGAR:</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                    
                    <button type="submit" style={submitButtonStyle}>
                        ✅ FINALIZAR PEDIDO
                    </button>
                </div>
            </form>
        </div>
    );
};

// Estilos (mantidos os mesmos)
const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#b0b0b0',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #444',
    backgroundColor: '#2c2c2c',
    color: '#f0f0f0',
    boxSizing: 'border-box',
};

const radioLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    backgroundColor: '#2c2c2c',
    borderRadius: '4px',
    cursor: 'pointer',
};

const summaryItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    fontSize: '0.9em',
};

const summaryStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    paddingTop: '5px',
    borderTop: '1px dashed #444',
};

const totalStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    paddingTop: '10px',
    borderTop: '2px solid #ff9900',
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#ff9900',
};

const submitButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px',
    marginTop: '30px',
    backgroundColor: '#ff9900',
    color: '#121212',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default Pedidos;