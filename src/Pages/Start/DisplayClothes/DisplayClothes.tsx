import { useState } from "react"
import styles from "./DisplayClothes.module.scss"
import Product from "../../../Product/Product"
import { useFetchAllProducts } from "../../../customHooks/useFetchAllProducts"
import Heading from "../../../Components/Heading"

interface Props{
    heading:string,
    products?:any
}


const DisplayClothes = ({heading}:Props) => {
    let {products} = useFetchAllProducts();
    const [isShowMoreOpen, setIsShowMoreOpen] = useState(false)
    const numberOfResults = isShowMoreOpen ? 8 : 4 as const;
    const getFourLatestProducts = products?.slice(0, numberOfResults).map((product) => (
        
            <Product key={product.id} {...product}/>
        
    ))
    const buttonText = isShowMoreOpen ? "SHOW LESS" : "SHOW MORE";

    return (
        <section className={styles.wrapper}>
            <Heading text={heading} />
            <div className={styles.products}>
                {products.length > 0 ? getFourLatestProducts : <p>Products not found</p>}
            </div>
            <button onClick={() => setIsShowMoreOpen(!isShowMoreOpen)} className={styles.btn}>{buttonText}</button>
            
        </section>
    )

}

export default DisplayClothes;