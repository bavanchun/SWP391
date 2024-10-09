const jwt = require("jsonwebtoken") 
const multer = require("multer"); 
const packageMember  = require("../models/packageMember");

const middlewareController =  {
    verifyToken : (req , res , next) => {
        const token = req.headers.token || req.headers.authorization; 
         
        
        if (token) {
            // su dung cho headers khi co  "Bearer 12341"  token.split(" ")[1]
            const accessToken = token.startsWith("Bearer ")
              ? token.split(" ")[1]
              : token;
        
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user ) => {
              if (err) {
               return res.status(403).json("Token is not valid");
              }

              req.user = user;
              next();
            });
            
        }else {
           return res.status(404).json("you're not authenticated")
        }
    } , 
    verifyTokenAdminAuth : (req , res, next) => {
         middlewareController.verifyToken(req,res,  () =>
        { 
         if (req.user.id == req.params.id || req.user.admin) {
            next();
         }else{ 
            return res.status(403).json("You Are Not Authenticated ")
         }
        }) 
    },verifyTokenMember : (req  ,res , next) => {
      middlewareController.verifyToken(req ,res , async () => {
         console.log(req.user.id);
         
        if (req.user.memberStatus) {
          const packageMem = await packageMember.find({accountID : req.user.id}).populate('accountID');
          console.log(packageMem);
          
          if (packageMem) { 
          const currentDate = new Date();
          if (new Date(packageMember.expires) < currentDate) {
            return  res.status(403).json("Membership expired , Please register again")
          } 
        }else {
          return res.status(404).json("Not found memberShip");
        }

        next();
   
        }else{
          return  res.status(403).json("You need join Member ")
        }
      })
    }

}

module.exports = middlewareController