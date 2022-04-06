import { createServer as HTTPS_Server } from 'https';
import { createServer as HTTP_Server } from 'http';
import express, { urlencoded } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = express();
const https = HTTPS_Server({
	key: readFileSync('cert/_.onekilobit.eu-key.pem', 'utf8'),
	cert: readFileSync('cert/_.onekilobit.eu-crt.pem', 'utf8')
}, app);

app.use(urlencoded({ extended: true }));

app.get('/', (_, res) => {
	res.sendFile(join(__dirname, '/public/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(
		join(__dirname, '/public/', req.path,
			req.path.includes('.') ? '.html' : ''
	));
});

// Just to redirect the default http://onekilobit.eu to https://www.onekilobit.eu
HTTP_Server((req, res) => {
	res.writeHead(301, { Location: `https://www.${req.headers.host}${req.url}` });
	res.end();
}).listen(80);

https.listen(443);