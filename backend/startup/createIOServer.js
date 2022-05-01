module.exports = function(app){
    httpServer = require('./io')(app);
    return httpServer;
}