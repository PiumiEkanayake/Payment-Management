import {IPayment} from "../../interfaces/IPayment";


export interface IPaymentService{
    createPayment(request:IPayment):Promise<IPayment>;
    getAllPayment():Promise<IPayment[]>;
    getPaymentById(id:String):Promise<IPayment | Object>;
    updatePayment(id:String,product:IPayment):Promise<IPayment | Object>;
    deletePayment(id:String):Promise<IPayment | Object>;
   
   
}