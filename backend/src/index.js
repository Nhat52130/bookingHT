const  express = require("express");
const dotenv = require("dotenv");

const  mongoose =  require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authRoute = require("./router/authRouter");
const hotelRoute = require("./router/hotelsRouter");
const roomRoute = require("./router/roomsRouter");
const searchRoute = require("./router/searchRouter");
const usersRoute = require("./router/usersRouter");
const bookingRoute = require("./router/bookingRouter");
const categoriesRouter = require("./router/categoriesRouter");
const orderRoute = require("./router/orderRouter");
const vnpayRouter = require("./router/vnpayRouter");
const featuredRouter = require("./router/featuredRouter");
const port = 8800;

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to mongoDB."); 
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/search", searchRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", orderRoute);
app.use("/api/vnpay", vnpayRouter);
app.use("/api/featured", featuredRouter);
app.use("/uploads", express.static("uploads"));

app.listen(8800, () => {
  connect();
  console.log(`backend app listening on port ${port}`);

});
