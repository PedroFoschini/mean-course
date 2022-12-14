const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const postsRoutes = require('./routes/posts');
const userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://Foschini:" + process.env.MONGO_ATLAS_PW +"@cluster0.2navllt.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected to DB!');
    }).catch(() => {
        console.log('connection fail!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        next();
    });

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
    

module.exports = app;