/** @format */

const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");

const app = express();

// cert
const privateKey = fs.readFileSync("/certs/mgamlem3/privkey.pem", "utf8");
const certificate = fs.readFileSync("/certs/mgamlem3/cert.pem", "utf8");
const ca = fs.readFileSync("/certs/mgamlem3/chain.pem", "utf8");

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca,
};

// create servers
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
	console.log("HTTPS Server running on port 443");
});

// redirect http traffic
http
	.createServer(function(req, res) {
		res.writeHead(301, {
			Location: "https://" + req.headers["host"] + req.url,
		});
		res.end();
	})
	.listen(80);

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
