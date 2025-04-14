import { createContext, useContext, useEffect, useReducer } from "react";
import { CartProduct, ProductInterface, User } from "../types/types"
import { ContextState } from "../types/types"
import axios from "axios";
import { token, API_SERVER } from "../main";
import { useUserContext } from "./UserContext";

interface State extends ContextState{
    cart:{
        totalPrice:number,
        items:CartProduct[]
    },
}

const initialState:State = {
    cart:{
        totalPrice:0,
        items:[]
    },
    loading:false,
    error:null
}

type Action = {type:"UPDATE_CART", payload:CartProduct[]}

const cartReducer = (state:State, action:Action):State => {
    switch(action.type) {
        case "UPDATE_CART":
            const prices = action.payload.map((item) => item.quantity * item.product.price) 
            const pricesSum = prices.reduce((acc, cur) => acc + cur, 0)
            return {...state, cart:{totalPrice:pricesSum, items:action.payload}, loading:false, error:null};
        default:
            return state;
    }
}

const CartContext = createContext<{
    state:State,
    addProduct: (product: ProductInterface, size: string, quantity: number) => Promise<void>,
    removeProduct:(id:number) => Promise<void> 
}>({
    state:initialState,
    addProduct:async () => {},
    removeProduct:async () => {}
})

export const CartProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const {state:userContext} = useUserContext()

    const getCartCall = async() => {
        const cartData = await getCartItems()
        cartData && dispatch({type:"UPDATE_CART", payload:cartData})
    }

    useEffect(() => {
        getCartCall()
    }, [])

    const getCartItems = async () => {
        try {
            const response = await axios.get(`${API_SERVER}/cart/get-all`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            const data:CartProduct[] = response.data
            return data;
            
        } catch (e) {
            console.log(e)
        }
    }

    const addProduct = async (product:ProductInterface, size:string, quantity:number) => {
            const user = userContext.user

            if (user && product) {
                const cartItem = {
                    productId:product.id,
                    userEmail:user.email,
                    size:size,
                    quantity:quantity
                }
                try {
                    const response = await axios.post(`${API_SERVER}/cart/add`, cartItem, {
                        headers:{
                            Authorization: "Bearer " + token
                        }
                    })
                    try {
                       getCartCall()
                    } catch (e) {
                        console.log(e)
                    }
                    
                    console.log(response)
                } catch (e) {
                    console.log(e)
                }
            } 
            
    }

    const removeProduct = async (id:number) => {
        try {
            const response = await axios.patch(`${API_SERVER}/cart/remove/${id}`,null, {
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            // getCartCall()
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <CartContext.Provider value={{ state, addProduct, removeProduct}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext)
    return context;
}
// const useFetchProductFromCart = (autoStart:boolean) => {

//     const [products, setProducts] = useState<CartProduct[]>([])

//     const getFromCart = async () => {
        // try {
        //     const response = await axios.get(`${API_SERVER}/cart/get-all`, {
        //         headers: {
        //             Authorization: "Bearer " + token,
        //         }
        //     })
        //     const data:CartProduct[] = response.data
        //     setProducts(data)
        //     console.log(data)
        // } catch (e) {
        //     console.log(e)
        // }
//     }

//     useEffect(() => {

        
//         getFromCart()

//     }, []);

//     return {products, getFromCart}
// }