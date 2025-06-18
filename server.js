// server importing http and file system and file path.

const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000; // port 

// access to following files.
const mimeTypes = {   
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  // Normalize URL and handle root path
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  
  // Prevent directory traversal
  filePath = path.resolve(__dirname, filePath.replace(/^\/+/, ""));
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { "Content-Type": "text/html" });
    res.end("403: Access Forbidden");
    return;
  }

  // Get file extension
  const extName = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extName] || "application/octet-stream";

  // Serve file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404: File Not Found, Bhai!");
      } else {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`500: Server Error - ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server chal raha hai on http://localhost:${port}`);
});