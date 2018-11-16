'use strict'

const express = require('express')
const app = express();
const bodyparser=require('body-parser')
const router=express.Router();
const signuproutes=require('./routes/signuproutes');
const loginroutes=require('./routes/loginroutes');
const dashboardroutes=require('./routes/dashboardroutes');


app.use(bodyparser.json());




app.use('/signup',signuproutes);
app.use('/login',loginroutes);
app.use('/dashboard',dashboardroutes);



































process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
  });


process.on('uncaughtException', (err) => {
    console.log(1, `Caught exception: ${err}\n`);
  });






app.listen(3000, () => {
    console.log("server started on port 3000")
})
