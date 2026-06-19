// import express from 'express';
// import './database/connection.js';


// const app = express();

// export default app;


import express, { Request, Response } from 'express'

import userRoute from './routes/userRoute'
import "./database/connection"
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'

const app = express()

app.use(express.json())

app.use("/api/auth", userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
// const schedule = require('node-schedule');

// const job = schedule.scheduleJob('42 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });  // Yo chai supabase afai automatically banda hunxa yadi hamile 1 hafta samma table ma push garinam vane
// So TESAILE NPM I NODE-SCHEDULE VANNE PACKAGE LE SUPABASE MA AUTOMATICALLY 42 MIN MA PUSH GARDINXA YO CODE LE TESLE GARDA SUPABSE ACTIVE VARSAKHAXA

export default app