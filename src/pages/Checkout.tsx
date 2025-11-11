// src/pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import Pedidos, { CartItem, CheckoutData } from './Pedidos';

const Checkout = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Pega o carrinho do localStorage quando a página carrega
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const handleOrder = (data: CheckoutData) => {
        console.log('--- PEDIDO FINALIZADO ---');
        console.log('Dados do Pedido:', data);
        console.log('Itens do Carrinho:', cart);
        
        // Limpa o carrinho
        setCart([]);
        localStorage.removeItem('cart');
        
        alert("Seu pedido foi realizado com sucesso! Acompanhe o status.");
    };

    // Se carrinho vazio
    if (cart.length === 0) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', color: '#f0f0f0' }}>
                <h2>Seu carrinho está vazio.</h2>
                <p>Volte ao cardápio para adicionar itens ao pedido.</p>
                <button 
                    onClick={() => window.history.back()}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#ff9900',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Voltar ao Cardápio
                </button>
            </div>
        );
    }

    return (
        <Pedidos 
            cartItems={cart} 
            onPlaceOrder={handleOrder} 
        />
    );
}

export default Checkout;