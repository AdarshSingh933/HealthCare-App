const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cors = require('cors');
const path = require('path');


//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/user',require('./routes/userRoutes'));

// Static file
app.use(express.static(path.join(__dirname,'./client/src')));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/public/index.html'));
})

//port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, (err) => {
    if (err) {
        console.error("Error:", err);
        return;
    }
    console.log("server is listening on port", port);
});
