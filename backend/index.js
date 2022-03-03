const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
require('dotenv').config();



dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(
        console.log("connected to MongoDB"));

const PORT = process.env.PORT || 3001;        

//middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(helmet());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.listen(PORT, ()=>{
    console.log('Backend server is up and running');
});