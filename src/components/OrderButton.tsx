
import { ShoppingBag } from "lucide-react";

const OrderButton = () => {
  return (
    <a 
      href="https://wa.me/5511999999999?text=Olá%2C+quero+fazer+um+pedido+na+Smash+House+🍔" 
      className="order-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ShoppingBag size={20} />
      Fazer Pedido
    </a>
  );
};

export default OrderButton;
