const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connection = require("./config/database");
const authRouter = require("./routes/auth");
const { default: mongoose } = require("mongoose");

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/v1/auth", authRouter);

/// API router


(async () => {
   try {
      await connection();
      app.listen(port, () => {
        console.log("server is running at " + port);
      });

   } catch (error) {
      console.log(error);
      
   }
})
();