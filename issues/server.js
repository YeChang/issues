const express = require("express");
const app = express();

// use
app.use(express.json());
app.use(require("cors")());

app.use("/static", express.static("./public"));

//router
app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(9527, () => {
  console.log("http://localhost:9527");
});
