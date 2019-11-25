const http = require('http');
const jsonData = require('./data.json');
const port = 3000;
const requestHandler = (request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    response.end(JSON.stringify(jsonData));
}
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});