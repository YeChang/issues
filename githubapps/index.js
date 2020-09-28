const token = "f302f535184f9183760bb1714807506a991fc11e";
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
    // console.log(item);
    let item = items[0]
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
