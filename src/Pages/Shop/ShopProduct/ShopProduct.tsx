import { ProductInterface } from "../../../types/types";
import styles from "./ShopProduct.module.scss"
import { useState } from "react";
import StarRating from "../../../Product/StarRating";
import { Link } from "react-router";
const ShopProduct = (product:ProductInterface) => {

    const [_, setRating] = useState(0)


    return (

        <Link to={`/product/${product.name}`} className={styles.product}> 
            <div className={styles.img_wrapper}><img className={styles.img} src={product.images[0]} alt="image" /></div>
            <div className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <div className={styles.ratings}><StarRating setRating={setRating} product={product}/></div>
                <p className={styles.price}>$ {product.price}</p>
            </div>
        </Link>
    )
}

export default ShopProduct;