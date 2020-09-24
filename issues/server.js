const express = require("express");

const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/issuses-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: String,
  })
);

//  Product.insertMany([
//    {title: '111'},
//    {title: '222'},
//    {title: '333'},
//    {title: '444'},
//  ])

// use
app.use("/static", express.static("."));
app.use(require("cors")());
app.use(express.json());

//router
app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/products", async (req, res) => {
  res.send(await Product.find());
});


app.get("/product/:id", async (req, res) => {
  res.send(await Product.findById(req.params.id));
});

app.post("/products", async (req, res) => {
  const data = req.body;
  const product = await Product.create(data);
  res.send(product);
});

app.listen(9527, () => {
  console.log("http://localhost:9527");
});
