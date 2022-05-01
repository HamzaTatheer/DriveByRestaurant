//maybe pass app to function below to read env variables. But dont do this in main branch
const initialiseEnvironmentVariables = require('./startup/dotenv');
const createExpressServer = require("./startup/createExpressServer");
const connectToDatabase =require('./startup/db');
const createIOServer = require("./startup/createIOServer");
initialiseEnvironmentVariables();
connectToDatabase().then(()=>{
  let app = createExpressServer();
  let http_server = createIOServer(app);
  let port = process.env.SOCKET_PORT || 9000;
  http_server.listen(port, () => {
    console.log(`Server has started lisenting on port ${port}`);
  });
})
