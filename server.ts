import adminSeeder from './adminSeeder.js';
import app from './src/app.js';

import { envConfig } from './src/config/config.js';

function startServer(){
   const port = envConfig.port || 4000;
   
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  adminSeeder()  // Admin seeding function is called here to ensure that the admin user is created when the server starts. This way, we can guarantee that the admin user exists in the database before any requests are made to the server.
});
}

startServer();

