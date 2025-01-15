require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
