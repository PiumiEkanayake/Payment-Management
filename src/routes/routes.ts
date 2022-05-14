import * as express from "express";
import PaymentController from "../controllers/payementController";

export default function setRoutes(app: any) {
  const router = express();
  const PaymentControl = new PaymentController;
  app.use("/api", router);

// Payment Routes
router.route('/payments').post(PaymentControl.createPayment);
router.route('/payments').get(PaymentControl.getAllPayments);
router.route('/payments/:id').get(PaymentControl.getPaymentById);
router.route('/payments/:id').put(PaymentControl.updatePayment);
router.route('/payments/:id').delete(PaymentControl.deletePayment);


}
