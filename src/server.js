import express from 'express';

const PORT = 5000;

const server = express();

server.get("/", (req, res) => {
 res.send("Hello World"); 
});

const HTTPserver = server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

export default HTTPserver;
