// server.js
const corsAnywhere = require('cors-anywhere');

// Define the port and host for your proxy server
const host = '0.0.0.0'; // Listen on all network interfaces
const port = 8080; // Choose any available port

corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
    console.log(`CORS Anywhere proxy running on http://${host}:${port}`);
});
