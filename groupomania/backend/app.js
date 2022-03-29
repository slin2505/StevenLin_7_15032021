const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const app = express();

require('dotenv').config();
const db = require('./config/db');

// dossier Routes
const userRoutes = require('./routes/user.routes.js');
const postRoutes = require('./routes/post.routes.js');
const commentRoutes = require('./routes/comment.routes');
const userCheck = require('./middlewares/userCheck');

// Connection à mySQL
db.sync()
    .then((console.log('Connected to database')))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
}));
// app.use(helmet());

app.get('/jwtid', userCheck, (req, res) => {
    res.status(200).json(res.locals.userId)
});

// Dossier Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes)

module.exports = app;