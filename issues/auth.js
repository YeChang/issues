const clientId = "6715024282cb2af57493";
const clientSecret = "d6bc82ce958bf99fb60c2dc38a95c40ab754b342";
const express = require("express");
const axios = require("axios");

const app = express();
app.use(require("cors")());

// app.use(express.static("webapp"));

app.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
});

let token = null;
app.get("/oauth-callback", (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code,
  };
  const opts = { headers: { accept: "application/json" } };
  axios
    .post(`https://github.com/login/oauth/access_token`, body, opts)
    .then((res) => res.data["access_token"])
    .then((_token) => {
      token = _token;
      res.json({ token: token });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
console.log("http://localhost:3000");
