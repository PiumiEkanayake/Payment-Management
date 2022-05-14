import {Logger} from "../loaders/logger";
import {IPayment} from "../interfaces/IPayment";
import Payment from "../models/Payment";


export class PaymentDao{

    private logger = Logger.getInstance();
    public static instance:PaymentDao = null;

    public static getInstance():PaymentDao{
        if(this.instance === null){
            this.instance = new PaymentDao();
        }
        return this.instance;
    }

    public async save(request:IPayment){
        this.logger.info("PaymentDao - save()");
        const payment = new Payment(request);
        return await payment.save()
            .then(data=>{
                this.logger.info(`Payment ${data._id} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("PaymentDao - getAll()");
        return await Payment.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Payment Retrieved Successfully`);
                }else{
                    this.logger.info(`Payment Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving categories" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("PaymentDao - getById()");
        return await Payment.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data._id} Payment Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Payment ${id} Not Found`)
                    return {msg:"Payment Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving Payment ${id} ${error.message}`);
                throw error;
            })
    }
    public async getProductsByPayment(name:string){
        this.logger.info("PaymentDao - getProductsByPayment()");
        return await Payment.findOne({name:name}).populate('products')
            .then(data=>{
                if(data){
                    this.logger.info(`${data._id} Payment Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Payment ${name} Not Found`)
                    return {msg:"Payment Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving ${name} Payment ${error.message}`);
                throw error;
            })
    }
    public async update(id:String,payment:IPayment){
        this.logger.info("PaymentDao - update()");
        return await Payment.findByIdAndUpdate(id,{$set:payment},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data._id} Payment Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Payment ${id} Not Found`);
                    return {msg:"Payment Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Payment ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("PaymentDao - delete()");
        return await Payment.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data._id} Payment Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Payment ${id} Not Found`);
                    return {msg:"Payment Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Payment ${id} ${error.message}`);
                throw error;
            })
    }

}