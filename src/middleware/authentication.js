const cookieparser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const client = require('../db/model');

const auth = async (req,res,next)=>{
    try {
        const cookietoken = req.cookies.jwt
        const verify = jwt.verify(cookietoken,"mynameisnamolsonietmits3rdyearr");
        console.log(verify);
        const userr = await client.findOne({_id:verify._id});
        // console.log(userr);

        req.token = cookietoken;
        req.user = userr;

        next();
    } catch (error) {
        res.status(401).render('login',{
            content:error
        });
    }
}


module.exports = auth ;

require("../db/model");