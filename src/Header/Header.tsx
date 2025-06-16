import styles from "./Header.module.scss"
import { FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import Navigation from "./Navigation/Navigation";
import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router";
import { useUserContext } from "../context/UserContext";

const Header = () => {
    const [isNavigationOpen, setIsNavigationOpen] = useState(false)
    const {state} = useCartContext();
    const {state:user_state, logout} = useUserContext()
    const navigate = useNavigate()
    const [displayQuantity, setDisplayQuantity] = useState(false)
    const logout_user = () => {
        logout()
        
        navigate("/")
    }


    useEffect(() => {
        if (user_state.user !== null) {
            setDisplayQuantity(true)
        } else setDisplayQuantity(false)
    }, [user_state])

    useEffect(() => {
        const handleResize = () => {
            setIsNavigationOpen(window.innerWidth >= 1200);
        }
    
        // Run once on mount
        handleResize();
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.discount_box}>
                <h5 className={styles.heading}>Sign up and get 20% off to your first order. <span className={styles.sign}>Sign up now</span></h5>
            </div>
            <section className={styles.main_header}>
                <div className={styles.wrapper}>
                    <div className={styles.about}>
                        <div onClick={(e) => {
                                e.stopPropagation()
                                
                            }} className={styles.bar_container}>
                            <FaBars onClick={() => setIsNavigationOpen(!isNavigationOpen)} className={styles.bars}/>
                        </div>
                        <Link to="/"><h4 className={styles.name}>SHOP.CO</h4></Link>
                    </div>
                    <div className={styles.info}>
                        {isNavigationOpen && <Navigation />}
                       <HiMiniMagnifyingGlass className={`${styles.magnifying_glass} ${styles.icon}`}/>
                       <input type="text" placeholder="Search for product..." className={styles.search_products_input} />
                        <Link to="/cart" className={styles.cart_container}>
                            {displayQuantity ? <div className={styles.ammount_products}>{state.cart.items.length}</div> : null}
                            <IoCartOutline className={`${styles.icon} ${styles.cart}`}/>
                        </Link>
                        
                        
                        { user_state.user !== null ? 
                         <p onClick={logout_user}>Logout</p>
                        :
                        <div className={styles.links}>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </div>
                        }   
                       {/* <FaRegUserCircle className={styles.icon}/> */}
                    </div>
                </div>
            </section>
        </header>
    )

}

export default Header;