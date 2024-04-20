const http = require('http');
const  app  = require('./app/app.js');

//creating server instance
const server = http.createServer(app);

//starting server
server.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000 or 2030');
});
