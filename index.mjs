import { createServer } from 'node:http';

const PORT = 4000;

const server = createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    if (method === 'GET' && parsedUrl.pathname === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'GET request - Home route' }));
    } else if (method === 'GET' && parsedUrl.pathname === '/about') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'GET request - About page' }));
    } else if (method === 'POST' && parsedUrl.pathname === '/api/products') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newProduct = JSON.parse(body);  
            res.statusCode = 201;
            res.end(JSON.stringify({ message: 'POST request - New product added', data: newProduct }));
        });
    }
    
        else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(PORT, () => console.log(`Server is listening at: http://localhost:${PORT}`));
