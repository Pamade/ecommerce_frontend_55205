import { loadStripe } from "@stripe/stripe-js";
import styles from "../Cart.module.scss";
import axios from "axios";
import { API_SERVER, token } from "../../../main";

const stripePromise = loadStripe("pk_test_51RGdrhQAyzvYrAEbwKTh1eXm0zb6ilp09MMzuK37Q2IqRC5n3JTINfgRzAR9Nxq3zTI1hjEUfPcoRNOtomcNGnxu00EITOCXLR")

const CheckoutButton = () => {

    

    const handleCheckout = async () => {
        try {
            const response = await axios.post(`${API_SERVER}/stripe/create-checkout-session`, null, {
                headers:{
                    Authorization:"Bearer " + token
                }
            })
            const stripe = await stripePromise;
            if (stripe) {
                const result = await stripe.redirectToCheckout({
                    sessionId: response.data.sessionId
                  });
                  result.error &&  alert("Wystąpił błąd podczas przekierowania do Stripe.");                   
            }
        }
        catch (e) {
            alert("Wystąpił błąd podczas przekierowania do Stripe.");                   
        }
    }

    return <button className={`${styles.btn} ${styles.btn_checkout}`} onClick={handleCheckout}>PAY NOW</button>
}

export default CheckoutButton