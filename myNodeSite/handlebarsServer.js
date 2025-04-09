// Load required modules
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const fs = require("fs");

// Create Express application
const app = express();

// Set port number
const port = 1337;

// Set up Handlebars view engine with helpers
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "views/layouts"),
        helpers: {
            json: function (context) {
                return JSON.stringify(context);
            },
        },
    })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Define path to public directory
const publicDirectoryPath = path.join(__dirname, "public");

// Set up static file directories
app.use(express.static(publicDirectoryPath));
app.use("/css", express.static(path.join(publicDirectoryPath, "css")));
app.use("/images", express.static(path.join(publicDirectoryPath, "images")));
app.use("/js", express.static(path.join(publicDirectoryPath, "js")));

// Load members data
let membersData = [];
try {
    const membersDataPath = path.join(
        __dirname,
        "public",
        "data",
        "members.json"
    );
    if (fs.existsSync(membersDataPath)) {
        membersData = JSON.parse(fs.readFileSync(membersDataPath, "utf8"));
    }
} catch (error) {
    console.error("Error loading members data:", error);
}

// Define routes for each page
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        isHome: true,
        galleryImages: [
            "/images/1.jpg",
            "/images/2.jpg",
            "/images/3.jpg",
            "/images/4.jpg",
            "/images/5.jpg",
            "/images/6.jpg",
        ],
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact Us",
        isContact: true,
    });
});

app.get("/events", (req, res) => {
    res.render("events", {
        title: "Events",
        isEvents: true,
    });
});

app.get("/goals", (req, res) => {
    res.render("goals", {
        title: "Our Goals",
        isGoals: true,
    });
});

app.get("/members", (req, res) => {
    res.render("members", {
        title: "Our Members",
        isMembers: true,
        members: membersData,
    });
});

app.get("/success-stories", (req, res) => {
    res.render("success-stories", {
        title: "Success Stories",
        isSuccessStories: true,
    });
});

// 404 handler - must be before the error handler
app.use((req, res, next) => {
    res.status(404).render("404", {
        title: "404 - Page Not Found",
        errorMessage: "The page you are looking for does not exist.",
    });
});

// 500 error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("500", {
        title: "500 - Server Error",
        errorMessage: "Something went wrong on our end.",
    });
});

// Start server
app.listen(port, () => {
    console.log(`Handlebars server is running at http://localhost:${port}/`);
});
