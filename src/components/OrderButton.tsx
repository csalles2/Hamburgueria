<<<<<<< HEAD
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/checkout");
    };

    return (
        <button
            onClick={handleClick}
            className="order-button"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: "#ff9900",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold"
            }}
        >
            <ShoppingBag size={20} />
            Fazer Pedido
        </button>
    );
};

export default OrderButton;
=======

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
>>>>>>> 6d23d566d0395f292d198045b326b87b3e56ecda
