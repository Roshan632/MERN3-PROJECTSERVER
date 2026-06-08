import app from './src/app.js';

import { envConfig } from './src/config/config.js';

function startServer(){
   const port = envConfig.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}

startServer();
