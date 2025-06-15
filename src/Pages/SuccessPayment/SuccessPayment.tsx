import { useCartContext } from "../../context/CartContext";

const SuccessPayment = () => {
    useCartContext()
    return <h1>Success Payment</h1>
}

export default SuccessPayment;