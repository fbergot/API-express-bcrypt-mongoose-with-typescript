import { Schema, model } from "mongoose";

export interface Product {
    title: { type: string; required: boolean };
    description: { type: string; required: boolean };
    imageUrl: { type: string; required: boolean };
    price: { type: number; required: boolean };
    userId: { type: string; required: boolean };
}

const productSchema = new Schema<Product>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        userId: { type: String, required: true }   
    }
);


export const modelProd = model<Product>("Product", productSchema);

