// Import necessary module
import { createServer } from 'node:http';

// Define the port number
const PORT = 3000;

// Create server
const server = createServer((req, res) => {
    const { method, url } = req; // Extract method and URL

    // Home route for GET request
    if (method === 'GET' && url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Welcome to the Home Page' }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

// Start listening on the defined port
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
