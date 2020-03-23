/** @format */

const express = require("express");
const fs = require("fs");
const https = require("https");
const serveIndex = require("serve-index");

const app = express();
const port = 80;

app.use(express.static("public"));

app.get("/public", function(req, res) {
	res.status(200).send("okay");
});
app.get("/.well-known*", function(req, res) {
	const string = "/etc/letsencrypt" + req.url;
	console.log(string);
	const file = fs.readFileSync(string.toString());
	console.log(file);
	res.sendFile(string);
});
app.get("/", function(req, res) {
	res.status(200).send("index");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

https
	.createServer(
		{
			key: fs.readFileSync("/etc/letsencrypt/mgamlem3/privkey.pem"),
			cert: fs.readFileSync("/etc/letsencrypt/mgamlem3/fullchain.pem"),
		},
		app,
	)
	.listen(443, function() {
		console.log("Example app listening on port 443!");
	});
