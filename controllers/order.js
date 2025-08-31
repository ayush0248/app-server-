import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/order.js';
import User from '../models/user.js';
import Transcation from '../models/transcation.js';

const createTransaction = async (req, res) => {
    const { amount, userId } = req.body;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: amount * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`

    }
    
    try {
    
    if(!amount || !userId){
        return res.status(400).json({
            success: false,
            message: "Amount and userId are required"
        })
    }
    
    const razorpayOrder= await razorpay.orders.create(options);
    res.status(200).json({
        success: true,
        message: "order created successfully",
        key: process.env.RAZORPAY_KEY_ID,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
    })

    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message,
        });
    }
};

const createOrder = async (req, res) => {
    const {
        amount,
        razorpay_Payment_Id,
        razorpay_Order_Id,
        razorpay_Signature,
        userId,
        cartItems,
        deliveryDate,
        address,

    } = req.body;

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    const generated_signature = crypto.createHmac('sha256', key_secret)
        .update(razorpay_Order_Id + '|' + razorpay_Payment_Id)
        .digest('hex');

        if(generated_signature === razorpay_Signature) {
           
            try{
                const transcation = await Transcation.create({
                    user: userId,
                    paymentId:razorpay_Payment_Id,
                   order:razorpay_Order_Id,
                    status: "success",
                    amount:cartItems.reduce((total, item) =>total+item?.quantity*item.price,0),
                    
                });

                const order = await Order.create({
                    user: userId,
                    deliveryDate,
                    address,
                    items:cartItems?.map((item) => ({
                        product: item._id,
                        quantity: item.quantity,
                    })),
               
                    status: "Order Placed",
                });

                transcation.orderId = order._id;
                await transcation.save();
                res.json({
                    success: true,
                    message: "Payment verified and order created successfully",
                    order,
                
                });
            }
            catch(error){
                res.status(500).json({
                    success: false,
                    message: "Failed to create order",
                    error: error.message,
                });
            }
        }
};

const getOrderByuserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ user: userId }).populate("user", "name email")
        .populate("items.product", "name price image_uri ar_uri")    
        .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user"
            });
        }

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};

export { createTransaction, createOrder, getOrderByuserId };