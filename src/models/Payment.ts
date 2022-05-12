import {IPayment} from "../interfaces/IPayment";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const PaymentSchema = new Schema(
    {
        chname:{
            type:String,
            required:false,
            trim:true
        },
        cnum:{
            type:String,
            required:false,
            trim:true,
        },
    
        cvc:{
            type:String,
            required:false,
            trim:true,
        },
        expiry:{
            type:String,
            required:false,
            trim:true,
        },
        type:{
            type:String,
            required:false,
            trim:true,
        },
        total:{
            type:Number,
            required:false,
            trim:true,
        },
        date:{
            type:Date,
            required:false,
            trim:true,
        },
    }



);
export default mongoose.model<IPayment & mongoose.Document>('payment',PaymentSchema)