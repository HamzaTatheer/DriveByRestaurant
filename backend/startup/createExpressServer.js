const express = require('express');
const _ = require("lodash");
let app = express();

module.exports =function(){
    require('./validation')();
    require('./publicFolders')(app);
    require('./cors')(app);
    require('./logging')();
    require('./routes')(app);
    return app;
}