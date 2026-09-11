const logEvents = require('./logEvents')
const http = require('http') 
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const EventEmitter = require('events');

 class MyEmitter extends EventEmitter {}

 const myEmitter = new MyEmitter();

 const PORT = process.env.PORT || 3000;

 const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    let path;

    
    if(req.url === '/' || req.url === 'index.html') {
        res.statusCode = 200;
        res.se
    }
    
 })

 server.listen(PORT, () => console.log(`server listening at port${PORT}`))
 

//  myEmitter.on('log', (msg) => logEvents(msg))

// setTimeout(() => {
//     myEmitter.emit('log', 'Log Event Emitter')
// })

