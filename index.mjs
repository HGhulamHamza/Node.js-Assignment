import { createServer } from 'http';
import { randomUUID } from 'node:crypto'; // This will help generate unique ids for products

const PORT = 4000;
let products = []; // Sample array to hold product data

const server = createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    // Handle GET request - Home route
    if (method === 'GET' && parsedUrl.pathname === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'GET request - Home route' }));

    // Handle GET request - About route
    } else if (method === 'GET' && parsedUrl.pathname === '/about') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'GET request - About page' }));

    // Handle POST request - Adding a new product with auto generated id
    } else if (method === 'POST' && parsedUrl.pathname === '/api/products') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newProduct = JSON.parse(body);
            newProduct.id = randomUUID(); // Assign a unique id to the product
            products.push(newProduct); // Save the new product in the array
            res.statusCode = 201;
            res.end(JSON.stringify({ message: 'POST request - New product added', data: newProduct }));
        });

    // Handle PUT request - Update an existing product by ID
    // } else if (method === 'PUT' && parsedUrl.pathname.startsWith('/api/products/')) {
    //     const productId = parsedUrl.pathname.split('/').pop(); // Get product ID from URL
    //     let body = '';
    //     req.on('data', chunk => {
    //         body += chunk.toString();
    //     });
    //     req.on('end', () => {
    //         const updatedProduct = JSON.parse(body);
    //         const productIndex = products.findIndex(p => p.id === productId); // Find product by ID

    //         if (productIndex !== -1) {
    //             products[productIndex] = { ...products[productIndex], ...updatedProduct }; // Update the product
    //             res.statusCode = 200;
    //             res.end(JSON.stringify({ message: `PUT request - Product with ID ${productId} updated`, data: products[productIndex] }));
    //         } else {
    //             res.statusCode = 404;
    //             res.end(JSON.stringify({ message: `Product with ID ${productId} not found` }));
    //         }
    //     });

    // Route not found
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(PORT, () => console.log(`Server is listening at: http://localhost:${PORT}`));