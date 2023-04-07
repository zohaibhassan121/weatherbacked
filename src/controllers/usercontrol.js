const User = require('../model/schema')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SECRET_KEY = "ASDFGHJKLZXCVBNMASDFGHJUYTREWQAS"
const signup = async (req, res) =>{
 // exiting user
 // hashpassword
 // user create
 // genrate token
 const { name, email, password} = req.body;
 if (!name || !email || !password){
  return res.status(422).json({error:"plz fill the a data"});
 }
  try {
   const userAllow = await User.findOne({ email:email });

   if (userAllow){
     return res.status(422).json({ error: "email already Exist"})  
   }else{
     const user = new User(req.body);

     await user.save()
     res.status(201).json({message:"user rigister sucessfuly"});
   }
  } catch (err) {
   console.log(err)
  }
}

const login = async (req, res) =>{
  let token;
  try {  
  const {email, password} = req.body;
  if ( !email || !password){
    return res.status(422).json({error:"plz fill the a data"});
   }
  const userExit = await User.findOne({email : email});

   if(!userExit){
       return res.status(404).json({massege: 'user not found'});
 }
const matchpassword = await bcrypt.compare(password, userExit.password)
if(!matchpassword){
  return res.status(400).json({massege: 'invaild information'});
}else{
 token = await userExit.generateAuthToken();
console.log(token);

res.cookie('jwtoken', token,{
  expires : new Date(Date.now() + 25892000000),
  httpOnly: true
})
const vertoken = jwt.sign({email: userExit.email, id : userExit._id }, SECRET_KEY );
res.status(201).json({User : userExit, token : vertoken});
}
} catch (error) {
  console.log("error")
      res.json(500).json({massege : "something went wrong"});
  
}
}

module.exports = { signup, login}