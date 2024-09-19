import { createServer } from 'http';

const PORT = 3000;

const server = createServer((req, res) => {
    res.end('Server is running');
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
