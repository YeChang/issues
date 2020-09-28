// http
const token = "aaaaf77fea9bb604fddb94c63fd3bcfc05fdace6";
const axios = require("axios");
const http = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    accept: "application/json",
    Authorization: `token ${token}`,
  },
});

// console.log(items);

const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/Test-22`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    url: String,
    urls: Array,
  })
);

async function doit(items, count) {
  for (const item of items) {
    let url = `/search/issues?q=repo:${item.name}+special+character`;
    const res = await http.get(url);
    let temp = {
      name: item.name,
      url: item.url,
      urls: res.data.items,
    };
    await Item.create(temp);
    // console.log(res.data.items.length);
  }
}

function __main() {
  const fs = require("fs");

  var items = JSON.parse(
    fs.readFileSync("data.json", "utf-8", function (err, data) {
      if (err) {
        console.error(err);
      }
    })
  );

  var timesRun = 0;
  var count = 0;
  var interval = setInterval(function () {
    timesRun++;
    if (timesRun === 30) {
      clearInterval(interval);
    }
    doit(items.slice(0, 30), count);
    //do whatever here..
  }, 61000);
}

__main();
