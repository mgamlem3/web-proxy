const express = require('express');
const fs = require("fs");

const app = express();
const port = 80;

app.use(express.static('public'))

app.get("/", (req, res) => res.sendFile("index.html"));
app.get("/.well-known*", function (req, res) {
	res.sendFile(fs.readFileSync('/etc/letsencrypt' + req.url));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
