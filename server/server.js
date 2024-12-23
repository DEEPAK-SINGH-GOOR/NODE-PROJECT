const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db");
const { userRouter } = require("./routers/user.route");
const productRoute = require("./routers/product.route");
const { CommentRouter } = require("./routers/comment.route");
const cartRoute = require("./routers/cart.route");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is running successfully" });
});

app.use("/user", userRouter);
app.use("/products", productRoute);
app.use("/comments", CommentRouter);
app.use("/cart", cartRoute);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDb();
});
