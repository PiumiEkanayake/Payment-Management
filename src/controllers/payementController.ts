import {Logger} from "../loaders/logger";
import {PaymentService} from "../services/PaymentService";
import {IPayment} from "../interfaces/IPayment";
import {IPaymentService} from "../services/interfaces/IPaymentService";
const autoBind = require('auto-bind');

export default class PaymentController {

    private logger:Logger;
    private PaymentService:IPaymentService;

    constructor(){
        this.logger = Logger.getInstance();
        this.PaymentService = PaymentService.getInstance();
        autoBind(this);
    }

    public async createPayment(req:any, res:any){
        this.logger.info("PaymentController - createPayment()");

        if(req.body){
            await this.PaymentService.createPayment(req.body)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                });
        }
    }

    public async getAllPayments(req:any, res:any) {
        this.logger.info("PaymentController - getAllPayments()");

        await this.PaymentService.getAllPayment()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getPaymentById(req:any, res:any) {
        this.logger.info("PaymentController - getPaymentById()");
        const id = req.params.id;
        await this.PaymentService.getPaymentById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async updatePayment(req:any, res:any) {
        this.logger.info("PaymentController - updatePayment()");

        const id = req.params.id;
        const Payment:IPayment = req.body;
        await this.PaymentService.updatePayment(id ,Payment)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async deletePayment(req:any, res:any) {
        this.logger.info("PaymentController - deletePayment()");
        const id = req.params.id;
        await this.PaymentService.deletePayment(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }
}
