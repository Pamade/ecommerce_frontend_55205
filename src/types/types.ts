interface Reviews {
    id:number,
    review:string,
    rating:number,
    user:User,
}

export type DressType = "T_SHIRT" | "JEANS" | "JACKET" | "DRESS" | "OTHER"
export type DressStyle = "CASUAL" | "FORMAL" | "SPORTS" | "OTHER"

export interface FilterState {
    dressStyle: DressStyle | null;
    dressType: DressType | null;
    color: string | null;
    size: string | null;
    priceRange: [number, number];
}

export interface User {
    email: string; // this is email
    firstName:string;
    lastName:string;
    phoneNumber:number,
    city:string,
    address:string
}

export interface ProductInterface {
    id: number;
    name: string;
    description: string;
    details: string;
    price: number;
    color: string;
    dressStyle: DressStyle; // Add more if needed
    dressType: DressType; // Add more if needed
    createdAt: string; // ISO date string
    images: string[];
    ratings: number[];
    productReviews: Reviews[];
    sizeQuantities: Record<string, number>; // Example: { S: 10, M: 15, L: 5 }
  }

export interface CartItem {
    userId:number,
    productId:number,
    quantity:number,
    size:string
}

export interface CartProduct {
    id:number,
    quantity:number,
    size:string,
    product:ProductInterface
}

export interface ContextState{

    loading:boolean,
    error:null|string,
}