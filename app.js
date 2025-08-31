import dotenv from "dotenv";
import express from "express";
import userRoutes from './routes/user.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import orderRoutes from './routes/order.js'
import connectDB from "./config/connect.js";
import { PORT } from "./config/config.js";
import { buildAdminJS } from "./config/setup.js";


dotenv.config();

const app = express();

app.use(express.json());

//Routes
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use("/order", orderRoutes);



const start = async () => {
  try {

      await connectDB(process.env.MONGODB_URL);

      await buildAdminJS(app);

    app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`server started on http://localhost:${PORT}/admin`);
      }
    });
  } catch (error) {
    console.log("Error starting server->", error);
  }
};

start();
