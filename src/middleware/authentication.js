const cookieparser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const client = require('../db/model');
require("../db/connection");

const auth = async (req,res,next)=>{
    try {
        const cookietoken = req.cookies.jwt
        const verify = jwt.verify(cookietoken,"mynameisnamolsonietmits3rdyearr");
        // console.log(verify);
        const userr = await client.findOne({_id:verify._id});
        // console.log(userr);

        req.token = cookietoken;
        req.user = userr;

        next();
    } catch (error) {
        if (error.message == "jwt must be provided") {
            res.status(401).render('login',{
                content:`you have been logged out , login again`
            });
        }
        else{
            res.status(401).render('filler',{
                content:`Do you want to continue with your action? `
            });
        }
    }
}

module.exports = auth ;
