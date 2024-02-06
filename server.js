const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cors = require('cors');


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

app.use("/api/v1/admin", require("./routes/adminRoutes"));

app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

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
