import { useEffect, useState } from "react";
import styles from "./Shop.module.scss"
import { Link, useSearchParams } from "react-router";
import Filters from "./Filters/Filters";
import { useFetchAllProducts } from "../../customHooks/useFetchAllProducts";
import { IoFilter } from "react-icons/io5";
import { FilterState, ProductInterface } from "../../types/types";
import ShopProduct from "./ShopProduct/ShopProduct";
import PaginationButtons from "../../Components/PaginationButtons/PaginationButtons";


const Shop = () => {


    const maxProductsPerPage = 9 as const;
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    const [searchParams] = useSearchParams()
    const {products} = useFetchAllProducts();
    const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(products)
    const [isFilterOn, setIsFilterOn] = useState( window.innerWidth >= 1200 ? true : false)

    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);

    const [filters, setFilters] = useState<FilterState>({
        dressStyle: null,
        dressType: null,
        color: null,
        size: null,
        priceRange: [priceMin, priceMax],
      });

      

    useEffect(() => {
        
        window.addEventListener("resize", () => {
            window.innerWidth >= 1200 ? setIsFilterOn(true) : setIsFilterOn(false)
        })

    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchParams])

    useEffect(() => {
            
            let filterProducts = products.filter((p) => {

                const pDressType = p.dressType.replace("_", "")

                const colorMatch = !filters.color || p.color.toLowerCase() === filters.color.toLowerCase();
                const dressStyleMatch = !filters.dressStyle || p.dressStyle.toLowerCase() === filters.dressStyle.toLowerCase();
                const dressTypeMatch = !filters.dressType || pDressType.toLowerCase() === filters.dressType.toLowerCase();
                const sizeMatch = !filters.size || filters.size in p.sizeQuantities;
                const priceMatch = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
            
                return colorMatch && dressStyleMatch && sizeMatch && priceMatch && dressTypeMatch;
            })

            setTotalItems(filterProducts.length || 0)

            filterProducts = filterProducts.slice((currentPage - 1) * maxProductsPerPage, currentPage * maxProductsPerPage)
            setFilteredProducts(filterProducts)

    }, [searchParams, products, currentPage])

    return (
        <section className={styles.shop}>
            {isFilterOn &&<Filters 
                priceMin={priceMin} 
                priceMax={priceMax} 
                setPriceMin={setPriceMin}
                setPriceMax={setPriceMax}
                filters={filters}
                setFilters={setFilters}
                setIsFilterOn={setIsFilterOn} products={products}/>}
            <div className={styles.content}>            
                <ul className={styles.list}>
                    <li className={styles.list_item}><Link className={styles.link} to="/">Home</Link></li>
                    <li className={styles.list_item}>&gt;</li>
                    <li className={styles.list_item}>Shop</li>
                </ul>
                <div className={styles.type_filters}>
                    <h5 className={styles.browse_products}>Browse Products</h5>
                    <IoFilter onClick={() => setIsFilterOn(true)} className={styles.filters_turn}></IoFilter>
                </div>
                <div className={styles.products}>
                    {filteredProducts.length !== 0 ?filteredProducts.map((product) => 
                            <>
                                <ShopProduct {...product}/>
                            </>
                    )
                    : <h5 className={styles.not_found}>No Products</h5>}
                </div>
                {totalItems > 0 && <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalItems} itemsPerPage={maxProductsPerPage}/>}
            </div>
        </section>
    )
}

export default Shop;