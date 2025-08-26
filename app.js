import dotenv from "dotenv";
import express from "express";
import userroute from './routes/user.js'

dotenv.config();

const app = express();

app.use(express.json());

//Rotes
app.use('/user',userroute)



const start = async () => {
  try {
    app.listen({ port: 3000, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.log(err);
      } else {
        console.log("server started on http://localhost:3000");
      }
    });
  } catch (error) {
    console.log("Error starting server->", error);
  }
};

start();
