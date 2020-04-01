/** @format */

const express = require("express");
const http = require("http");
const https = require("https");
const httpProxy = require("http-proxy");
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
const proxy = httpProxy.createProxyServer();
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

app.get("/.well-known*", function(req, res) {
	const string = "/etc/letsencrypt" + req.url;
	console.log(string);
	const file = fs.readFileSync(string.toString());
	console.log(file);
	res.sendFile(string);
});

// routes
app.get("/", function (req, res) {
	if (req.hostname.includes('git')) {
		proxy.web(req, res, {target: "gitlab.mgamlem3.com"})
	}
	else {
		res.status(200).send("index");
	}
});
