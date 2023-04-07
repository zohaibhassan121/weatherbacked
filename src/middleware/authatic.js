const jwt = require ("jsonwebtoken");
const SECRET_KEY = "ASDFGHJKLZXCVBNMASDFGHJUYTREWQAS"
const User = require('../model/schema');

const Auth = async (req, res, next)=>{
   try {
    const token = req.cookies.jwtoken;

    const verifyToken = jwt.verify(token, SECRET_KEY);
    const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
    if (!rootUser) { throw new Error('User not Found') }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();

   } catch (error) {
    res.status(401).send('Unauthorized: No token provided');
console.log(error);
   }
}

module.exports = { Auth };
