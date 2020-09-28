module.exports = () => {
  const token = "b697c447c44ae7cbd9b703d4595689fb3fd9e5d0";
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
      comments: Array,
    })
  );
  function store(i, repoName) {
    http
      .get(`repos/${repoName}/issues?state=all&page=${i}&per_page=100`)
      .then((res) => {
        console.log(res.headers);
      })
      .catch((err) => {
        console.log(err);
      });

    // for (const item of res.data) {
    //   let temp = {
    //     title: item.title.toLocaleLowerCase(),
    //     body: item.body.toLocaleLowerCase(),
    //     url: item.url,
    //     number: item.number,
    //     state: item.state,
    //     comments: [],
    //   };
    //   let flag = false;
    //   if (
    //     temp.title.includes("special character") ||
    //     temp.body.includes("special character")
    //   ) {
    //     flag = true;
    //   }
    //   const comments = http.get(
    //     `repos/${repoName}/issues/${item.number}/comments`
    //   );

    //   for (const comment of comments.data) {
    //     if (comment.body.toLocaleLowerCase().includes("special character")) {
    //       let body = {
    //         body: comment.body,
    //       };
    //       temp.comments.push(body);
    //       flag = true;
    //     }
    //   }
    //   if (flag) {
    //     console.log(temp);
    //     Issue.create(temp);
    //   }
    // }
    //https://api.github.com/repos/owncloud/android/issues/2970/comments
  }

  function doit(repoName) {
    let open = 0;
    let closed = 0;
    http
      .get(`search/issues?q=repo:${repoName}+type:issue+state:open`)
      .then(function (res) {
        open = res.data.total_count;
        http
          .get(`search/issues?q=repo:${repoName}+type:issue+state:closed`)
          .then((res) => {
            closed = res.data.total_count;
            let total = open + closed;
            let page = Math.round(total / 100);
            for (let i = 0; i < page; i++) {
              store(i, repoName);
            }
          });
      })
      .catch(function (err) {
        console.log(err);
      });

    //
  }

  return doit;
};
