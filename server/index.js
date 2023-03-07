const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const https = require('https');
const helmet = require("helmet"); 
const morgan = require("morgan"); 
const dotenv = require("dotenv"); 
const fs = require('fs');
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");


dotenv.config();

const app = express();

mongoose 
.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true })   
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));

const options = {
        key:  fs.readFileSync('key.pem'),
        cert:  fs.readFileSync('cer.pm')
};


// Create an HTTP server using the express app
const server = https.createServer(options, app);

// Set up middleware to parse JSON data and log HTTP requests
app.use(express.json());
app.use(morgan("common"));

// Set up middleware to set HTTP headers for improved security
app.use(
    helmet({
    contentSecurityPolicy: {
    directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    "img-src": ["'self'", "data:", "blob:"],
    },
    },
    })
);

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

// Start the HTTP server on port 8000 and log a message to the console
const PORT = process.env.PORT || 8000;
server.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`);
});
