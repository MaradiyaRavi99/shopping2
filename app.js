const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect("mongodb://127.0.0.1:27017/apnashop");
const port = 5500;
const cors = require("cors");

// Define mongoos schema
const loginSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
});

const Login = mongoose.model('Login', loginSchema); 

const OrderSchema = new mongoose.Schema({

    name: String,
    mobile: String,
    address: String,
    date: String,
    items: Array,
    total: Number,
    status: String
});

const Order = mongoose.model("Order", OrderSchema);

// EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // For serving static files
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5500"
}));
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// HTML SPECIFIC STUFF
app.set('view engine', 'html') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/Electronics.html", (req, res) => {
  res.sendFile(path.join(__dirname, "Electronics.html"));
});

app.get("/Sports.html", (req, res) => {
  res.sendFile(path.join(__dirname, "Sports.html"));
});

app.get("/order.html", (req, res) => {
  res.sendFile(path.join(__dirname, "order.html"));
});

app.get("/orderdetail.html", (req, res) => {
  res.sendFile(path.join(__dirname, "orderdetail.html"));
});

app.get("/profile.html", (req, res) => {
  res.sendFile(path.join(__dirname, "profile.html"));
});

app.post("/api/orders", async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order saved to MongoDB" });
});

/* ===== 4. STEP 5 — GET API (FETCH ORDERS) ===== */
app.get("/api/orders", async (req, res) => {
    const orders = await Order.find().sort({ _id: -1 });
    res.json(orders);
});

app.post("/login", async (req, res) => {
  try {
    const myData = new Login(req.body);
    await myData.save();

    // Redirect instead of sendFile
    return res.redirect("/");

  } catch (err) {
    return res.status(400).send("Item was not saved to the database");
  }
});

app.post("/login2", async (req, res) => {
  try {
    const myData = new Login(req.body);
    await myData.save();

    // Redirect instead of sendFile
    return res.redirect("/");

  } catch (err) {
    return res.status(400).send("You are Already Login in this site");
  }
});

// Get single order
app.get("/api/orders/:id", async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
});

// Update order status
app.put("/api/orders/:id", async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated" });
});

// Delete order
app.delete("/api/orders/:id", async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

