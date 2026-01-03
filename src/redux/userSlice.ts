import { createSlice } from '@reduxjs/toolkit'
import mongoose from 'mongoose';


interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "admin" | "user" | "deliveryBoy";
  image?: string;
}

interface IUserSlice {
  userData: IUser | null;
}


const initialState:IUserSlice={
    userData:null
};

 const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload;
        }
    }
 })

 export const {setUserData}=userSlice.actions;
 export const userReducer=userSlice.reducer;