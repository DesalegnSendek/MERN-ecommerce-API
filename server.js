const http = require('http');
const  app  = require('./app/app.js');

//creating server instance
const server = http.createServer(app);

//starting server
server.listen(process.env.PORT || 2030, () => {
    console.log('Server is running on port 3000');
});
