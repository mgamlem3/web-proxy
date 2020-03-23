/** @format */

const express = require("express");
const fs = require("fs");
const serveIndex = require("serve-index");

const app = express();
const port = 80;

app.use(express.static("public"));

app.get("/public", function(req, res) {
	res.status(200).send("okay");
});
app.get("/.well-known*", function(req, res) {
	res.sendFile(fs.readFileSync("/etc/letsencrypt" + req.url));
});
app.get("/", function(req, res) {
	console.log(req.url);
	res.sendFile("/index.html");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
