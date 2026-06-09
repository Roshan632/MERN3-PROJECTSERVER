// import express from 'express';
// import './database/connection.js';


// const app = express();

// export default app;


import express, { Request, Response } from 'express'
const app = express()
import userRoute from './routes/userRoute'
import "./database/connection"

app.use(express.json())

app.use("/api/auth", userRoute)

export default app