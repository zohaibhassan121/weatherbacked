const mongoose = require('mongoose')
const bcyript = require("bcrypt");
const SECRET_KEY = "ASDFGHJKLZXCVBNMASDFGHJUYTREWQAS"
const jwt = require('jsonwebtoken');
const userSechma = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    tokens:[
          
        {
            token:{
                type: String,
                required: true
            }
           
        }
    ]

}, {timestamps : true})


userSechma.pre('save', async function(next){
    console.log("passwor hashed ")
    if(this.isModified('password'))
    {
        this.password = await bcyript.hash(this.password, 12);
        this.cpassword = await bcyript.hash(this.password, 12);
    }
    next();
})

userSechma.methods.generateAuthToken = async function (){
    try {
        let token = jwt.sign({_id:this._id}, SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        await this.save()
        return token;

    } catch (error) {
        console.log(error)
    }
}


const User = mongoose.model('USER',userSechma);
module.exports = User;