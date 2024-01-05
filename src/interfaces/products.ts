export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface CartProduct extends Product {
    quantity: number;    
}