import { ProductInterface } from "../types/types";
import styles from "./Product.module.scss";
import StarRating from "./StarRating";
import { useState } from "react";

const Product = (product:ProductInterface) => {

    const [rating, setRating] = useState(0)


    return (
        <div className={styles.product}>
            <div className={styles.background_image}>
                <img className={styles.img} src={product.images[0]} alt="image" />
            </div>
            <div className={styles.info}>
                <p>{product.name}</p>
                <div className={styles.ratings}><StarRating setRating={setRating} product={product}/>{rating}</div>
                <p>$ {product.price}</p>
            </div>
        </div>
    )
}

export default Product;