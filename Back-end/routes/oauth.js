const { OAuth2Client } = require("google-auth-library");
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
dotenv.config(); // Load environment variables from .env file



// async function getUserData(access_token) {



// Tách hàm để lấy dữ liệu người dùng
async function getUserData(access_token) {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('User data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}

/* GET home page */
// router.get('/', async function(req, res) {

//   const code = req.query.code;
//   console.log('Authorization code:', code);

//   if (!code) {
//     return res.status(400).json({ error: 'Authorization code is missing' });
//   }

//   try {
//     const redirectURL = 'http://localhost:8081/oauth';
//     const clientId = process.env.CLIENT_ID;
//     const clientSecret = process.env.CLIENT_SECRET;

//     const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectURL);

//     // Lấy token từ Google với authorization code
//     const { tokens } = await oAuth2Client.getToken(code);
//     if (!tokens || !tokens.access_token) {
//       throw new Error('Failed to retrieve access token');
//     }

//     // Thiết lập token cho client
//     oAuth2Client.setCredentials(tokens);
//     console.info('Tokens acquired:', tokens);

//     // Lấy thông tin người dùng từ access token
//     const userData = await getUserData(tokens.access_token);
//     // 
//     const user = await new User({
        
//     })
//         // Phản hồi với thông tin người dùng
//     res.status(200).json({
//       message: 'User successfully authenticated',
//       user: userData,
//     }); 



//      } catch (error) {
//     console.error('Error during OAuth2 authentication:', error);
//     return res.status(500).json({ error: 'Authentication failed', details: error.message });
//   }
// });

const Generate =  {
  accessToken : (user) => {

    return jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },
  refreshToken  : (user) => {
    
    return jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "2d" }
    );
  }, 
}

router.post('/signin' , async  function(req ,res) {
   const data =  req.body.token
 console.log(data.email);
 const userExist = await  User.findOne({email : data.email})  

 // create password random 
 const randomPass = crypto.randomBytes(10).toString('hex');

 if (!userExist) {
  const nUser = new  User({
    email : data.email, 
    avatar  : data.picture, 
    provider : "Google", 
    name : data.name, 
    UserName : data.email,
    password : randomPass, 

  })
  await nUser.save(); 
  console.log(nUser);
  const access_token = Generate.accessToken(nUser);
  const refresh_Token = Generate.refreshToken(nUser);
  
  console.log(access_token);
      res.cookie("refresToken", refresh_Token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, // ms (miliseconds)
        path: "/",
        sameSite: "strict",
      });
  const {password ,...others} = nUser._doc;
  
  return res
    .status(200)
    .json({ ...others, message: "singin successful", accessToken: access_token });
  
 }else {
      const access_token = Generate.accessToken(userExist);
      const refresh_Token = Generate.refreshToken(userExist);

       res.cookie("refresToken", refresh_Token, {
         httpOnly: true,
         secure: false,
         maxAge: 3600000, // ms (miliseconds)
         path: "/",
         sameSite: "strict",
       });
       const {password , ...others} = userExist._doc;
       
      console.log(access_token);
  return res.status(200).json({accessToken : access_token , message  : "Login Successful" , ...others} )
 }

})
module.exports = router;

