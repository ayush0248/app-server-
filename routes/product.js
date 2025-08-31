
import express from 'express';
import { getProductsByCategoryId } from '../controllers/product.js';

const router = express.Router();

router.get("/:category", getProductsByCategoryId);

export default router;

