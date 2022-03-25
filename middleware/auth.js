const session = require("express-session");

const checkUser = (req, res, next) => {
    if(!req.session.user){
        res.redirect("/sign-in");
    }else{
        next();
    }
}

module.exports = {
    checkUser
}