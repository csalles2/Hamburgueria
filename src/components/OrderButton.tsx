
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




