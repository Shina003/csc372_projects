// Load the express module
const express = require("express");
const path = require("path");

// Express application
const app = express();

// variable that stores the port number
const port = 1337;

// variable that stores the path to the public directory
const publicDirectoryPath = path.join(__dirname, "public");

// Serve static files from the public directory
app.use(express.static(publicDirectoryPath));

// Specify css as a root directory from which to serve static files
app.use("/css", express.static(path.join(publicDirectoryPath, "css")));

// Specify images as a root directory from which to serve static files
app.use("/images", express.static(path.join(publicDirectoryPath, "images")));

// Specify js as a root directory from which to serve static files
app.use("/js", express.static(path.join(publicDirectoryPath, "js")));

// Serve web pages based on path
app.get("/", (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, "index.html"));
});

// React routes 
const reactRoutes = [
    "/home",
    "/contact",
    "/events",
    "/goals",
    "/members",
    "/success-stories",
];
reactRoutes.forEach((route) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(publicDirectoryPath, "index.html"));
    });
});

// wildcard route for any undefined routes - serve 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDirectoryPath, "404.html"));
});

// listen on the specified port
app.listen(port, () => {
    console.log(`Express server is running at http://localhost:${port}/`);
});
