const jwt = require("jsonwebtoken");
const config = require("config");

function auth(res, req, next){
    const token = req.header("x-auth-token");
    
    if (!token) {
        res.status(401).send("Access Denied, no token provided!")
        return;
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send(ex.message);
    }
}

module.exports = auth;