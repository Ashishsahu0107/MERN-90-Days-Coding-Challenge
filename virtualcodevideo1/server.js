import http from "http";

const Port = 3000;

const server = http.createServer((req, res) => {
    res.end("Hii dsajkfh first server");
});

server.listen(Port);

