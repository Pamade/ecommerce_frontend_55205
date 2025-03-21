import { useState } from "react";
import { useFetchAllProducts } from "../../../customHooks/useFetchAllProducts";
import Product from "../../../Product/Product";
import StarRating from "../../../Product/StarRating";
import styles from "./OurHappyCustomers.module.scss"
import Heading from "../../../Components/Heading";

const OutHappyCustomers = () => {

    const {products} = useFetchAllProducts();
    const productsWithReviews = products.filter((prodcut) => prodcut.productReviews.length > 0)
    const oneReviewForOneProductMaxFour = productsWithReviews.map((p) => p.productReviews.filter((_, i) => i === 0)).flat()

    return (
        <section className={styles.wrapper}>    
            <Heading text="OUR HAPPY CUSTOMERS"/>
            <div className={styles.reviews_wrapper}>
                {oneReviewForOneProductMaxFour.slice(0,4).map((r) => 
                    <div className={styles.product_single}>     
                        <StarRating productRating={r.rating}/>
                        <p className={styles.name}>{r.user.firstName} {r.user.lastName}</p> 
                        <p className={styles.review}>{r.review}</p>
                    </div>
                )}
            </div>
        </section>
    )

}

export default OutHappyCustomers;