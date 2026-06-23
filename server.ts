import adminSeeder from './adminSeeder.js';
import app from './src/app.js';

import { envConfig } from './src/config/config.js';
import categoryController from './src/controllers/categoryController.js';
import {Server} from 'socket.io'
import User from './src/database/models/userModel.js';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Role } from './src/middleware/userMiddleware.js';
import jwt from 'jsonwebtoken'
function startServer(){
   const port = envConfig.port || 4000;
   
const server = app.listen(port, () => {
  categoryController.seedCategory()
  console.log(`Server is running on port ${port}`);
  adminSeeder()  // Admin seeding function is called here to ensure that the admin user is created when the server starts. This way, we can guarantee that the admin user exists in the database before any requests are made to the server.
});
const io = new Server(server,{
  cors :{
    origin : "http://localhost:5173"  //yeslai matra websocket socket.io server sanga communicate garna dine
  }
})

let onlineUsers :{socketId:string,userId:string,role:string}[]=[]

let addToOnlineUsers=(socketId:string,userId:string,role:string)=>{
  onlineUsers=onlineUsers.filter((user)=>user.userId !== userId)
  onlineUsers.push({socketId,userId,role})
}
io.on("connection",(socket)=>{
 //console.log("Client connected vayo hai!!!")
 const {token}= socket.handshake.auth   //jwt token
 if(token){

       jwt.verify(token,envConfig.jwtSecretKey as string, async (err:any,result:any)=>{
        if(err){
          socket.emit("error",err)
            
        }else{
          const userData = await User.findByPk(result.userId) 
          if(!userData){
            socket.emit("error","no user found with that token")
             return 

          }
          addToOnlineUsers(socket.id,result.userId,userData.role)
          
              
               
              

        }
           
           
            
        
       })

 }

})
}


startServer();

