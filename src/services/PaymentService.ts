import {IPayment} from "../interfaces/IPayment";
import {Logger} from "../loaders/logger";
import {IPaymentService} from "./interfaces/IPaymentService";
import {PaymentDao} from "../dao/PaymentDao";
import cardValidator = require("card-validator");


export class PaymentService implements IPaymentService{
    private logger = Logger.getInstance();
    public static instance:PaymentService = null;
    private PaymentDao = PaymentDao.getInstance();
    public static getInstance():PaymentService{
        if(this.instance === null){
            this.instance = new PaymentService();
        }
        return this.instance;
    }

    public async createPayment(request:IPayment):Promise<any>{
        this.logger.info("Payment Services - createPayment()");
        const cvc = request.cvc;
     
        //Check if cvc is a number
    if(!parseInt(cvc)){
        return {status:"Fail",message:"Cvc should contain only digits"};
    }
    //Check if cvc contains 3 digits
    if(cvc.length!==3){
        return {status:"Fail",message:"Cvc number is invalid"};
    }
    //check if amount is valid
    if(request.total<=0){
        return {status:"Fail",message:"Amount is invalid"};
    }
    //Check if card number is valid
    let validate = cardValidator.number(parseInt(request.cnum));
    if(!validate.isPotentiallyValid){
        return {status:"Fail",message:"Card number is invalid"};
    }
    request.type=validate.card.niceType;

     return await this.PaymentDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllPayment():Promise<IPayment[]>{
        this.logger.info("Payment Services - getAllPayment()");
        return await this.PaymentDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getPaymentById(id:String):Promise<IPayment | Object>{
        this.logger.info("Payment Services - getPaymentById()");
        return await this.PaymentDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }


    public async updatePayment(id:String,Payment:IPayment):Promise<IPayment | Object>{
        this.logger.info("Customer Services - updateCustomer()");
        return await this.PaymentDao.update(id,Payment)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deletePayment(id:String):Promise<IPayment | Object>{
        this.logger.info("Payment Services - deletePayment()");
        return await this.PaymentDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    
   
}