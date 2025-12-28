import mongoose, { Schema, model, models, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "admin" | "user" | "deliveryBoy";
  image?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: false, default: "" }, 
    mobile: { type: String , required: false },
    role: { type: String, enum: ["admin", "user", "deliveryBoy"], default: "user" },
    image: { type: String },
  },
  { timestamps: true }
);

// This ensures the model is typed correctly for both Mongoose and TypeScript
const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);
export default User;