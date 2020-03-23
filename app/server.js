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
app.use(
	"/ls",
	express.static("/etc/certs"),
	serveIndex("/etc/certs", { icons: true }),
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Certificate
const privateKey = fs.readFileSync('/etc/certs/mgamlem3/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/certs/mgamlem3/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/certs/mgamlem3/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
	console.log("HTTPS Server running on port 443");
});