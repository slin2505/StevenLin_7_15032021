const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();

require('dotenv').config();
const db = require('./config/db');

const {checkUser, requireAuth} = require('./middlewares/auth');
const userRoutes = require('./routes/user.routes.js');
const postRoutes = require('./routes/post.routes.js');

db.sync()
    .then((console.log('Connected to database')))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// jwt middleware
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) =>{
    res.status(200).json({msg : res.locals.user.id});
});

// Dossier Image
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;