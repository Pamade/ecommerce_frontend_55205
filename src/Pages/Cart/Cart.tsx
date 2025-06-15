import styles from "./Cart.module.scss"
import { useCartContext } from "../../context/CartContext";
import CheckoutButton from "./CheckoutButton/CheckoutButton"

const imgNotFound = "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"

const Cart = () => {

    const {state, changeQuantityProduct, removeProduct} = useCartContext()
    const deliveryFee = 15;
    const cartPrice = Number(state.cart.totalPrice.toFixed(2))
    const totalPrice = deliveryFee + cartPrice
    const isNotEmpty = state.cart.items.length > 0
    const canIncrement = (maxQuantity:number, currentQuantity:number) => {
        return currentQuantity <= maxQuantity; // allow reaching max
    }

    const canDecrement = (currentQuantity:number) => {
        return currentQuantity > 1;
    }
    

    return (
        <section className={styles.wrapper}>
            <h1>Cart</h1>
            <div className={styles.summary_and_cart}>
                <div className={styles.products_wrapper}>
                    <div className={styles.products}>
                        {state.cart && isNotEmpty ?
                            state.cart.items.map((c) => 
                                
                                 (
                                    <div className={styles.single_product}>
                                        <img className={styles.img} src={c.product.images[0] || imgNotFound} alt="product"/>
                                        <div className={styles.about}>
                                            <div className={styles.name_remove}>
                                                <span className={styles.big}>{c.product.name}</span>
                                                <span onClick={() => removeProduct(c.id)} className={styles.remove}>Remove</span>
                                            </div>
                                            
                                            <p>Size: <span className={styles.small}>{c.size}</span></p>
                                            <p>Color: <span className={styles.small}>{c.product.color}</span></p>
                                            <div>
                                                <div className={styles.quantities_wrapper}>
                                                    <button disabled={!canDecrement(c.quantity)} onClick={() => {
                                                        if (canDecrement(c.quantity)) {
                                                            changeQuantityProduct(c.id, c.quantity - 1)
                                                        }
                                                    }} className={`${styles.btn} ${!canDecrement(c.quantity) && styles.btn_disabled}`}>-</button>
                                                    <div>{c.quantity}</div>
                                                    <button onClick={() => {
                                                        
                                                        if (canIncrement(c.product.sizeQuantities[c.size], c.quantity + 1)) {
                                                            changeQuantityProduct(c.id, c.quantity + 1)
                                                        }
                                                    }
                                                    
                                                    } className={`${styles.btn} ${!canIncrement(c.product.sizeQuantities[c.size], c.quantity + 1) && styles.btn_disabled}`}>+</button>
                                                </div>
                                            </div>
                                            <p><span className={styles.big}>{c.product.price}$</span></p>
                                        </div>
                                    </div>
                                )
                            
                                
                               )
                            : <h4>Cart is empty</h4> 
                        }
                    </div>
                </div>
                
                {isNotEmpty &&<div className={styles.products_wrapper}>
                    <h4>Order Summary</h4>
                    <div className={styles.summary_about}>
                        <div className={styles.description}>
                            <span className={styles.small}>Subtotal</span>
                            <span className={styles.big}>{cartPrice}$</span>
                        </div>
                        <div className={styles.description}>
                            <span className={styles.small}>Delivery Fee</span>
                            <span className={styles.big}>{deliveryFee}$</span>
                        </div>
                        <div className={styles.description}>
                            <span className={styles.small}>Total Price</span>
                            <span className={styles.big}>{totalPrice}$</span>
                        </div>
                    </div>
                    <CheckoutButton />
                </div>
                }
            </div>
            
        </section>
        
    )
}

export default Cart;