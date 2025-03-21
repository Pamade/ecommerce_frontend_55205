interface Reviews {
    id:number,
    review:string,
    rating:number,
    user:User,
}

export type DressType = "tshirt" | "hoodie" | "shorts" | "joggers"
export type DressStyle = "casual" | "formal" | "gym" | "party"

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
    dressStyle: "CASUAL" | "FORMAL" | "SPORTS" | "OTHER"; // Add more if needed
    dressType: "T_SHIRT" | "JEANS" | "JACKET" | "DRESS" | "OTHER"; // Add more if needed
    createdAt: string; // ISO date string
    images: string[];
    ratings: number[];
    productReviews: Reviews[];
    sizeQuantities: Record<string, number>; // Example: { S: 10, M: 15, L: 5 }
  }