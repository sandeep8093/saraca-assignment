const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async(req,res,next)=>{
    let user;
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        try{
            user = jwt.verify(token,process.env.JWT_SECRET);
            let userAuth = await User.findOne({ email: user.email });
            if (!userAuth) {
                return res.status(400).json({ error: 'user not found' });
            }  
        }catch{
            err={
                name:'TokeExprired',
                message: 'Auth token Expired'
            }
            return res.status(400).json(err);
        }
    }
    req.user = user;
    if(!user){
        return res.status(400).json({"error":"no auth token found"});
    }
    next();
}

module.exports = {
    verifyToken
}