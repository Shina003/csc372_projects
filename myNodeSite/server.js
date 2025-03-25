// Load required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Set port number
const port = 1337;

// Function to serve static files
function serveStaticFile(filePath, response, statusCode = 200) {
  // Default status message
  if (!http.STATUS_CODES[statusCode]) {
    statusCode = 200;
  }
  
  try {
    // Read the file
    const data = fs.readFileSync(filePath);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    
    // Determine content type
    let contentType = 'text/html';
    switch (ext) {
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      default:
        contentType = 'text/html';
    }
    
    // Send response
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.end(data);
    
  } catch (error) {
    console.error(`Error serving ${filePath}: ${error.message}`);
    
    // If not already serving 404 page, serve 404
    if (statusCode !== 404) {
      serveStaticFile('./public/404.html', response, 404);
    } else {
      // If error serving 404, return simple text response
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    }
  }
}

// Create HTTP server
const server = http.createServer((request, response) => {
  // Get path from URL (remove query params)
  let requestPath = request.url.split('?')[0];
  
  // Normalize the URL
  if (requestPath === '/') {
    requestPath = '/index.html';
  }
  
  // Construct file path
  const filePath = path.join('./public', requestPath);
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      // File exists, serve it
      serveStaticFile(filePath, response);
    } else {
      // Check if it's a known React route
      const reactRoutes = ['/home', '/contact', '/events', '/goals', '/members', '/success-stories'];
      
      if (reactRoutes.includes(requestPath)) {
        // If it's a React route, serve index.html
        serveStaticFile('./public/index.html', response);
      } else {
        // File doesn't exist and not a known route, serve 404
        serveStaticFile('./public/404.html', response, 404);
      }
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});