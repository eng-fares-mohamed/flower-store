const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let ext = path.extname(filePath).toLowerCase();
    let types = { 
        '.html': 'text/html', 
        '.jpeg': 'image/jpeg', 
        '.jpg': 'image/jpeg', 
        '.css': 'text/css',
        '.js': 'text/javascript'
    };
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
            res.end(data);
        }
    });
}); // هنا قفلنا السيرفر صح

// أهم سطر عشان الرفع على Render
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});