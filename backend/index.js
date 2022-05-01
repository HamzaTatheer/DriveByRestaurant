const createServer = require("./startup/createServer");
const app = createServer();

let port = process.env.SOCKET_PORT || 9000;
app.listen(port, () => {
  console.log(`Server has started lisenting on port ${port}`);
});