const express = require('express');
const _ = require("lodash");
let app = express();

module.exports = function(){
    require('./validation')();
    //pass app to function below to read env variables. But dont do this in main branch
    require('./dotenv')();
    require('./publicFolders')(app);
    require('./cors')(app);
    require('./routes')(app);
    require('./db')();
    require('./logging')();
    app = require('./io')(app);
    return app;    
    
}