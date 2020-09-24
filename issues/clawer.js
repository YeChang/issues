module.exports = () => {
  const token = "a5c293c88510ed38a8bf922a6e5f613b127b04e2";
  const fs = require("fs");
  const axios = require("axios");
  const http = axios.create({
    baseURL: "https://api.github.com/",
    headers: {
      accept: "application/json",
      Authorization: `token ${token}`,
    },
  });
  const mongoose = require("mongoose");

  let count = 0;
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
  async function store(i, repoName) {
    let dbName = repoName.split('/')[0] +  repoName.split('/')[1]
    mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const res = await http.get(
      `repos/${repoName}/issues?state=all&page=${i}&per_page=100`
    );
    // console.log(res.data.length);
    for (const item of res.data) {
      let temp = {
        title: item.title,
        body: item.body,
        url: item.url,
        number: item.number,
        state: item.state,
      };
      // console.log(temp);
      console.log(count++);
      await Issue.create(temp);
    }
    // fs.writeFile(
    //   `data/data${i}.json`,
    //   JSON.stringify(res.data, "", "\t"),
    //   function (err) {
    //     if (err) {
    //       res.status(500).send("Server is error...");
    //     }
    //   }
    // );
  }
  async function doit(repoName) {
    const open = await http.get(
      `search/issues?q=repo:${repoName}+type:issue+state:open`
    );
    const closed = await http.get(
      `search/issues?q=repo:${repoName}+type:issue+state:closed`
    );
    let total = closed.data.total_count + open.data.total_count;
    console.log(total);

    let page = Math.round(total / 100);
    for (let i = 0; i < page; i++) {
      store(i, repoName);
    }
  }

  return doit;
};
