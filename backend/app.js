const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const expressValidator = require("express-validator");
require("dotenv").config();

//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const braintreeRoutes = require("./routes/braintree");

//app
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//db
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    createIndexes: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(con => {
    //   console.log(con.connection)
    console.log("connection successful");
  });

//router middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", braintreeRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
