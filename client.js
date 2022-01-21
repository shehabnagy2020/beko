// server.js
const express = require("express");
const path = require("path");
const expressApp = express();
const { parse } = require("url");
const next = require("next");
const PORT = 3005;
const app = next({ dev: false });
const handle = app.getRequestHandler();

expressApp.use(express.static(path.join(__dirname, "/public")));
expressApp.use("/_next", express.static(path.join(__dirname, "/.next")));

app.prepare().then(() => {
  expressApp.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  expressApp.listen(PORT, (err) => console.log(`=> listen on ${PORT}`));
});
