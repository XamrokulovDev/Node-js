const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === "/books") {
        fs.readFile('books.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                return res.end('Xatolik yuz berdi');
            }

            const books = JSON.parse(data);
            let html = "<h1>Kitoblar ro'yxati</h1>";

            books.forEach(book => {
                html += `<h1>${book.title} <br> ${book.author}</h1>`;
            });

            html += '';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } 
    else if (req.url.includes("/books/")) {
        const bookId = req.url.split("/")[2];

        fs.readFile('books.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                return res.end('Xatollik yuz beddi...');
            }

            const books = JSON.parse(data);
            const book = books.find(b => b.id == bookId);

            if (book) {
                let html = `<h1>${book.title}</h1><h1>Muallifi: ${book.author}</h1>`;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('Kitob topolmadim afsuz...');
            }
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("Biror narsa yozzzzzzzz!");
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server ${PORT} daaaaaaaaa...`));