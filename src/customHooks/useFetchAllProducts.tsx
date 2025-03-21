import { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER } from "../main";
import { ProductInterface } from "../types/types";


export const useFetchAllProducts = () => {

    const [products, setProducts] = useState<ProductInterface[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`${API_SERVER}/products/all`, {
                headers:{"Accept":"application/json"}
            });
            console.log(response)
            const data:ProductInterface[] = response.data
            if (data.length > 0) {
                const fourLatestProducts = data.sort((a:ProductInterface, b:ProductInterface) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
                setProducts(fourLatestProducts)
            }
    
        }
        fetchProducts();
    }, [])
    return {products}
}