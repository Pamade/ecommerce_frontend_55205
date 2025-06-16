import styles from "./ProductPage.module.scss"
import { useEffect, useState } from "react"
import {ProductInterface } from "../../types/types"
import axios from "axios"
import { API_SERVER} from "../../main"
import { useParams } from "react-router"
import StarRating from "../../Product/StarRating"
import Faq from "./Faq/Faq"
import { useCartContext } from "../../context/CartContext"

type MoreContentType = "details" | "reviews" | "faq"

const ProductPage = () => { 
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState<ProductInterface>()
    const [indexOfMainPhoto, setIndexOfMainPhoto] = useState(0)
    const [sizeSelectedAndQuantity, setSelectedAndQuantity] = useState<{[index:string]:number}>({"S":1}) 
    const [moreAboutType, setMoreAboutType] = useState<MoreContentType>("details")
    const [notFound, setNotFound] = useState("")
    const {addProduct, findProductInCart} = useCartContext()
    
    const {name} = useParams()

    useEffect(() => {
        const fetchProduct = async ()=> {
            setIsLoading(true)
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
            finally{
                setIsLoading(false)
            }
        }
        fetchProduct()
    }, [])

    const handleSetMoreAbout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e.currentTarget.id as MoreContentType;
        setMoreAboutType(id)
    }

    const handleSelectSelectedSizeAndQuantity = (item:[string, number]) => {
        const size = item[0]
        const quantity = 1
        setSelectedAndQuantity({[size]:quantity})
    }

    const getSelectedAndQuantityKey = Object.keys(sizeSelectedAndQuantity)[0]
    const getQuantity = Object.values(sizeSelectedAndQuantity)[0]

    // Get the product that's already in cart for this size
    const sameProdductInCart = product && findProductInCart(product.id, getSelectedAndQuantityKey)
    
    // Calculate available stock (total stock - already in cart)
    const availableStock = product ? (product.sizeQuantities[getSelectedAndQuantityKey] - (sameProdductInCart?.quantity || 0)) : 0
    
    // Calculate remaining stock after current selection
    const remainingStock = availableStock - getQuantity

    const handleAddQuantity = () => {
        // Only allow increment if we won't exceed available stock
        if (getQuantity < availableStock) {
            setSelectedAndQuantity({[getSelectedAndQuantityKey]: getQuantity + 1})
        }
    }

    const handleSubtractQuantity = () => {
        if (getQuantity > 1) {
            setSelectedAndQuantity({[getSelectedAndQuantityKey]: getQuantity - 1})
        }
    }

    const handleAddToCart = () => {
        if (product && getQuantity <= availableStock && availableStock > 0) {
            addProduct(product, getSelectedAndQuantityKey, getQuantity)
        }
    }

    return (
        <section className={styles.wrapper}>
            {isLoading && <p>Loading...</p>}
            {!product && !isLoading && notFound && <h4>Product Not Found</h4>}
            {product &&
            <>
            <div className={styles.content}>
                <div>
                    <div className={styles.images_wrapper}>
                        <img className={styles.main_image} src={product.images[indexOfMainPhoto]} alt="main" />
                        <div className={styles.images}>
                            {product.images.map((image, i) => 
                                <div 
                                    key={i}
                                    onClick={() => setIndexOfMainPhoto(i)} 
                                    className={`${styles.product_single} ${i === indexOfMainPhoto && styles.selected}`}
                                >
                                    <img className={styles.image_collection} src={image} alt={`Product ${i}`}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.info}>
                        <p className={styles.name}>{product.name}</p>
                        <p className={styles.price}>{product.price}$</p>
                        <p className={styles.description}>{product.description}</p>
                    </div>
                    
                    <p className={styles.description}>Choose Size</p>
                    <div className={styles.sizes_wrapper}>
                        {product.sizeQuantities && Object.entries(product.sizeQuantities).map((item, index) => 
                            item[1] > 0 && (
                                <div 
                                    key={index}
                                    onClick={() => handleSelectSelectedSizeAndQuantity(item)} 
                                    className={`${styles.sizes_single} ${Object.keys(sizeSelectedAndQuantity)[0] === item[0] && styles.selected_size}`}
                                >
                                    <span className={styles.size}>{item[0]}</span>
                                </div>
                            )
                        )}
                    </div>
                    <div className={styles.quantities_and_add}>
                        <div className={styles.select_quantities_wrapper}>
                            <button 
                                onClick={handleSubtractQuantity} 
                                disabled={getQuantity === 1} 
                                className={styles.select_box}
                            >
                                -
                            </button>
                            <div className={styles.quantities_count}>{getQuantity}</div>
                            <button 
                                onClick={handleAddQuantity} 
                                disabled={getQuantity >= availableStock || availableStock <= 0}
                                className={styles.select_box}
                            >
                                +
                            </button>
                        </div>
                        <button 
                            onClick={handleAddToCart} 
                            disabled={getQuantity > availableStock || availableStock <= 0}
                            className={styles.add_to_cart_btn}
                        >
                            ADD TO CART
                        </button>
                    </div>
                    <div>
                        <span className={styles.in_stock}>
                            {availableStock <= 0 ? 
                                "Out of stock" : 
                                `In stock: ${remainingStock >= 0 ? remainingStock : 0}`
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.more_about_product}>
                <div 
                    id="details" 
                    onClick={handleSetMoreAbout} 
                    className={`${styles.more_about_single} ${moreAboutType === "details" && styles.more_about_single_selected}`}
                >
                    <span className={styles.more_about_text}>Product details</span>
                </div>
                <div 
                    id="reviews" 
                    onClick={handleSetMoreAbout} 
                    className={`${styles.more_about_single} ${moreAboutType === "reviews" && styles.more_about_single_selected}`}
                >
                    <span className={styles.more_about_text}>Reviews</span>
                </div>
                <div 
                    id="faq" 
                    onClick={handleSetMoreAbout} 
                    className={`${styles.more_about_single} ${moreAboutType === "faq" && styles.more_about_single_selected}`}
                >
                    <span className={styles.more_about_text}>Faq</span>
                </div>
            </div>
            <MoreContent type={moreAboutType} product={product}/>
            </>
            }
        </section>
    )
}

interface Props {
    type:MoreContentType,
    product:ProductInterface
}

const MoreContent = ({type, product}:Props) => {
    switch(type){
        case "details":
            return (
                <div>
                    <p>{product.details}</p>
                </div>
            )
        case "reviews":
            return (
                <div className={styles.reviews_wrapper}>
                    {product.productReviews.length === 0 ? <h4>No reviews</h4> :
                        <div className={styles.reviews_content}>
                            {product.productReviews.map((r, index) =>
                                <div key={index} className={styles.single_review}>
                                    <div><span>{r.user.firstName} {r.user.lastName}</span></div>
                                    <div><StarRating productRating={r.rating}/></div>
                                    <div>
                                        <p>{r.review}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            )
        case "faq":
            return <Faq />
        default:
            return <div><span>No content</span></div>
    }
}

export default ProductPage;