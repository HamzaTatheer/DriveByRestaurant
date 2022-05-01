const bcrypt = require("bcryptjs");


let hashPassword = async (password)=>{

    if(password.length == 0){
        throw new Error("Password length is 0");
    }

    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt)
    return hash;
}


module.exports = {hashPassword};