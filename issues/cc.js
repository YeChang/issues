module.exports = () => {
  const token = "a21878df4b70339b20b5b57faae53d13d1b72a7f";
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
  mongoose.connect(`mongodb://127.0.0.1:27017/Test-1`, {
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
      comments: [],
    })
  );
  async function store(i, repoName) {
    const res = await http.get(
      `repos/${repoName}/issues?state=all&page=${i}&per_page=100`
    );
    // console.log(res.data[0]);

    for (const item of res.data) {
      const comments = await http.get(
        `repos/${repoName}/issues/${item.number}/comments`
      );
      console.log(comments.data);
    }
    //https://api.github.com/repos/owncloud/android/issues/2970/comments
    // for (const item of res.data) {
    //   let temp = {
    //     title: item.title,
    //     body: item.body,
    //     url: item.url,
    //     number: item.number,
    //     state: item.state,
    //   };
    //   // console.log(temp);
    //   console.log(count++);
    //   await Issue.create(temp);
    // }
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
