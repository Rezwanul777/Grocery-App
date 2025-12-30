import { auth } from "@/auth";
import { uploadCloudinaryImage } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        await connectToDatabase();
        const session= await auth()
        if(session?.user?.role !== 'admin'){
            return NextResponse.json(JSON.stringify({message: 'Unauthorized'}), {status: 403});
        }
    
    const formData= await request.formData();
    const name= formData.get('name') as string;
    const category= formData.get('category') as string;
    const price= parseFloat(formData.get('price') as string);
    const unit= formData.get('unit') as string;
    //const description= formData.get('description') as string;
    const file= formData.get('image') as Blob | null;
    
    if (!name || !category || !unit) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    let imageUrl: string | null = null;
    if(file){
        imageUrl = await uploadCloudinaryImage(file)
    }
    
    if (!imageUrl) {
        return NextResponse.json({ message: 'Image upload failed' }, { status: 400 });
    }
    
    const groceryItem= await Grocery.create({
         name,
        category,
        price,
        unit,
        image: imageUrl
    })
    return NextResponse.json(groceryItem, {status: 201});
       
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch (error: any) {
        return NextResponse.json({ message: `add grocery error ${error}` }, { status: 500 });
    }   
}