import { ProductInterface } from "../../../types/types";
import styles from "./ShopProduct.module.scss"
import { useState } from "react";
import StarRating from "../../../Product/StarRating";

const ShopProduct = (product:ProductInterface) => {

    const [rating, setRating] = useState(0)


    return (

        <div className={styles.product}> 
            <div className={styles.img_wrapper}><img className={styles.img} src={product.images[0]} alt="image" /></div>
            <div className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <div className={styles.ratings}><StarRating setRating={setRating} product={product}/></div>
                <p className={styles.price}>$ {product.price}</p>
            </div>
        </div>
    )
}

export default ShopProduct;