"use strict";

const fs = require("fs");

var items = JSON.parse(
  fs.readFileSync("items.json", "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    }
  })
);

var result = [];
let count = 1;

for (const item of items) {
  for (const url of item.urls) {
    let temp2 = {
      url: url.html_url,
      name: url.title,
      id: count++,
    };
    result.push(temp2);
  }
}
// console.log(items);

fs.writeFileSync("data.json", JSON.stringify(result, "", "\t"), function (err) {
  if (err) {
    res.status(500).send("Server is error...");
  }
});

console.log("This is after the read call");
