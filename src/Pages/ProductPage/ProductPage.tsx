import styles from "./ProductPage.module.scss"
import { useEffect, useState } from "react"
import { ProductInterface } from "../../types/types"
import axios from "axios"
import { API_SERVER } from "../../main"
import { useParams } from "react-router"

const ProductPage = () => { 

    const [product, setProduct] = useState<ProductInterface>()
    const [indexOfMainPhoto, setIndexOfMainPhoto] = useState(0)
    const [selectedSize, setSelectedSize] = useState("M")
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [notFound, setNotFound] = useState("")
    const {name} = useParams()

    useEffect(() => {

        const fetchProduct = async ()=> {
            try {
                const response = await axios.get(`${API_SERVER}/products/${name}`) 
                const productFetched = response.data
                if (productFetched) {
                    setProduct(productFetched)
                } else setNotFound("Product Not Found")
                
                console.log(response.data)
            }
            catch(e) {
                setNotFound("Product Not Found")            
            }

        }
        fetchProduct()
        
    }, [])


    return (
        <section className={styles.wrapper}>
            <div className={styles.content}>
                <div>
                    <div className={styles.images_wrapper}>
                        <img className={styles.main_image} src={product?.images[indexOfMainPhoto]} alt="main" />
                        <div className={styles.images}>
                            {product?.images.map((image, i) => <div onClick={() => setIndexOfMainPhoto(i)} className={`${styles.product_single} ${i === indexOfMainPhoto && styles.selected}`}><img className={styles.image_collection} src={image}/></div>)}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.info}>
                        <p className={styles.name}>{product?.name}</p>
                        <p className={styles.price}>{product?.price}$</p>
                        <p className={styles.description}>{product?.description}</p>
                    </div>
                    
                    <p className={styles.description}>Choose Size</p>
                    <div className={styles.sizes_wrapper}>
                    {product?.sizeQuantities && Object.entries(product.sizeQuantities).map((item) => <div onClick={() => setSelectedSize(item[0])} className={`${styles.sizes_single} ${selectedSize === item[0] && styles.selected_size}`}>
                        {item[1] > 0 &&<span className={styles.size}>{item[0]}</span>}
                        {/* <span className={styles.quantities}>{item[1]}</span> */}
                        </div>)
                    }
                    </div>
                    <div className={styles.quantities_and_add}>
                        <div className={styles.select_quantities_wrapper}>
                            <button onClick={() => setSelectedQuantity(prev => prev-=1)} disabled={selectedQuantity === 1} className={styles.select_box}>-</button>
                            <div className={styles.quantities_count}>{selectedQuantity}</div>
                            <button onClick={() => setSelectedQuantity(prev => prev+=1)} className={styles.select_box}>+</button>
                        </div>
                        <button className={styles.add_to_cart_btn}>ADD TO CART</button>
                    </div>
                </div>
                
                {/* {product?.sizeQuantities.map((item) => item)} */}
            </div>
        </section>
        
    )

}

export default ProductPage;