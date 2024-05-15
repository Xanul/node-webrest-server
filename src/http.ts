import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

  console.log(req.url);

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(htmlFile);
    res.end();
  } else if (req.url === '/css/styles.css') {
    const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(cssFile);
    res.end();
  } else if (req.url === '/js/app.js') {
    const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.write(jsFile);
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
})

// server.listen(8080, () => {
//   console.log('Server running on port 8080')
// });