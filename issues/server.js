const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");

// use
app.use("/static", express.static("."));
app.use(require("cors")());
app.use(express.json());

//mongo
mongoose.connect(`mongodb://127.0.0.1:27017/Test-9-25`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Issue = mongoose.model(
  "Issue",
  new mongoose.Schema({
    title: String,
    body: String,
    url: String,
    number: Number,
    state: String,
  })
);


//router
app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/products", async (req, res) => {
  Issue.find();
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
