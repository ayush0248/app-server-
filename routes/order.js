
import express from 'express';
import { createTransaction } from '../controllers/order.js';
import { getOrderByuserId } from '../controllers/order.js';
import { createOrder } from '../controllers/order.js';

const router = express.Router();

router.post("/transcation", createTransaction);
router.post("/userId", getOrderByuserId);   
router.post("/", createOrder);

export default router;