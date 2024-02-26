const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
var cors = require('cors');
//const User = require('./models/appointmentUser');
const postUserRouter = require('./routes/postUser');
const getUsersRouter = require('./routes/getUsers');
const delUserRouter = require('./routes/delUser');
const errorRouter = require('./routes/404error');


app.use(cors());

app.use(bodyParser.json());

app.use(postUserRouter);

app.use(getUsersRouter);

app.use(delUserRouter);

app.use(errorRouter);



sequelize.sync()
    .then(user =>{
        //console.log(user);
        app.listen(4000);
        console.log('server is running')

    })
    .catch(err => console.log(err));
