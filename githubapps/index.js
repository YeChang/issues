const token = "34204a9673d69e86229285248e4597bf57d4d004";
const fs = require("fs");
const axios = require("axios");
const http = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    accept: "application/json",
    Authorization: `token ${token}`,
  },
});

let items = JSON.parse(
  fs.readFileSync("data.json", "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    }
  })
);
// console.log(items);
async function doit() {
  // console.log(items);
  // for (const item of items) {
  let item = items[0];
  console.log(item);
  let url = `/search/issues?q=repo:${item.name}+special+character`;
  // console.log(url);
  const res = await http.get(url);
  item.urls = res.data.items;
  console.log(res.headers);
  console.log(res.data.items.length);
  // }
}

doit();

// fs.writeFileSync("test.json", JSON.stringify(items, "", "\t"));
