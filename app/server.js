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
	express.static("/certs"),
	serveIndex("/certs", { icons: true }),
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// const privateKey = fs.readFileSync('/certs/mgamlem3/privkey.pem');
const privateKey = fs.readFile(
	path.resolve(__dirname, "/certs/mgamlem3/privkey.pem"),
	(err, data) => {
		//error handling
		if (err) return console.error(err);
		return data;
	},
);
// const certificate = fs.readFileSync('/certs/mgamlem3/cert.pem');
const certificate = fs.readFile(
	path.resolve(__dirname, "/certs/mgamlem3/privkey.pem"),
	(err, data) => {
		//error handling
		if (err) return console.error(err);
		return data;
	},
);
// const ca = fs.readFileSync('/certs/mgamlem3/chain.pem');
const ca = fs.readFile(
	path.resolve(__dirname, "/certs/mgamlem3/chain.pem"),
	(err, data) => {
		//error handling
		if (err) return console.error(err);
		return data;
	},
);

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
	console.log("HTTPS Server running on port 443");
});