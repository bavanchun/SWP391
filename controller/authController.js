const { json } = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt")


const authController =  {
    registerUser : async (req , res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await  bcrypt.hash(req.body.password , salt)


            // create  a new user 
            const newUser = await new User({
                 name : req.body.name, 
                 email : req.body.email ,
                 password : hashed , 
            });
            

            // save to database 
            const user = await newUser.save();
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }  
    ,
    loginUser : async (req ,res) => {
        
     try {
         const user = await User.findOne({ name : req.body.name})
        if (!user) {
            res.status(404).json("Wrong UserName"); 
        }
        const ValidPassword = await  bcrypt.compare(
            req.body.password, 
            user.password
        )
        if (!ValidPassword) {
            res.status(404).json("wrong password");
            
        }

        if (user && ValidPassword) { 
            res.status(200).json(user)
        }
    
     } catch (error) {
        res.status(500).json(error)
     }
    }
}

module.exports  = authController;