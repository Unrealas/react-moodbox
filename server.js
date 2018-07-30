const express = require('express');
const app = express();
require('dotenv').config();
const mongoose=require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');


// connect to DB
mongoose.connect(process.env.DB_HOST, {useNewUrlParser:true});
mongoose.connection
    .once('open', () => console.log('connected to DB'))
    .on('error', (err) => console.log(err));
mongoose.Promise = global.Promise;

// globalus kintamieji pasiekiami proces.env
// console.log(process.env);

// server configuration
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// static files
app.use(express.static(__dirname+'/public'));

// use routes
app.use('/', authRoutes);
app.use('/', postsRoutes);
app.use('/', userRoutes);


if(process.env.NODE_ENV==='production'){
    app.use(express.static(__dirname+'/client/build'));
    app.get('/*', (req,res) => {
        res.sendFile(__dirname+'/client/build/index.html')
    })
}

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

