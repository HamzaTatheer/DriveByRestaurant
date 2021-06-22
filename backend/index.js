const express = require('express');
const _ = require("lodash");
const app = express();

require('./startup/dotenv')();
require('./startup/publicFolders')(app);
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/io')(app);
require('./startup/logging')();
require('./startup/db')();
require('./startup/validation')();

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`listening on port ${port}`);
// });