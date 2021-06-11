const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next){
    const token = req.header("access_token");
    
    if (!token) {
        res.status(401).send("Access Denied, no token provided!")
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    }
    catch(ex) {
        console.log(res);
        res.status(400).send(ex.message);
    }
}

module.exports = auth;