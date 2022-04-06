const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const https = require('https');

const cron = require('node-cron');

const fs = require('fs');
const { urlencoded } = require('express');
const privateKey = fs.readFileSync('cert/onekilobit.eu-key.pem', 'utf8');
const certificate = fs.readFileSync('cert/onekilobit.eu-crt.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app); 


let visits = 0;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'))
    visits++;
})

app.get('*', function (req, res) {
    if(req.path.includes('.')){
        res.sendFile(path.join(__dirname + '/public/' + req.path))
    } else{
        res.sendFile(path.join(__dirname + '/public/' + req.path + '.html'))
    }
})


//00 00 12 * * 0-6
cron.schedule('0 * * * *', () => {
    console.log("Home visits so far: " + visits);
});

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://www." + req.headers['host'] + req.url });
    res.end();
}).listen(80);

httpsServer.listen(443, function () { });