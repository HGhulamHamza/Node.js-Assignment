import { createServer } from 'node:http';

const PORT = 3000;

// Create a server with basic routes and methods
const server = createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);

    // Set response headers
    res.setHeader('Content-Type', 'application/json');

    // Home route
    if (method === 'GET' && parsedUrl.pathname === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Welcome to the Home Page' }));
    }
    // About route
    else if (method === 'GET' && parsedUrl.pathname === '/about') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'About Page' }));
    }



    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));