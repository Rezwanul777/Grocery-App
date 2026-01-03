import mongoose from "mongoose";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
  description?: string;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const GrocerySchema = new mongoose.Schema<IGrocery>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "fruits",
        "vegetables",
        "dairy",
        "bakery",
        "meat",
        "beverages",
        "snacks",
        "household",
      ],
      required: true,
    },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "litre", "piece", "ml", "g", "pack"],
    },
    description: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ prevent overwrite error in Next.js dev hot reload
const Grocery =
  mongoose.models.Grocery || mongoose.model<IGrocery>("Grocery", GrocerySchema);

export default Grocery;
