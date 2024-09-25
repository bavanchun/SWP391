const { json } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//npm install nodemailer
const nodemailer = require("nodemailer");

const authController = {
  accessToken: (user) => {
    return jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2m" }
    );
  },
  refreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "2d",
      }
    );
  },
  
  
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const gender = Number.parseInt(req.body.birthDate);
      // create  a new user
      const newUser = await new User({
        UserName: req.body.UserName,
        email: req.body.email,
        password: hashed,
        avatar: "",
        birthDate: req.body.birthDate,
        gender: gender,
        phoneNumber: req.body.phonenumber,
        Name: req.body.fullName,
      });

      // save to database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ UserName: req.body.UserName });
      if (!user) {
        return res.status(401).json("Wrong UserName");
      }
      const ValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!ValidPassword) {
        return res.status(401).json("wrong password");
      }

      if (user && ValidPassword) {
        // create JWT
        const accessToken = authController.accessToken(user);
        const refreshToken = authController.refreshToken(user);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000, // ms (miliseconds)
          path: "/",
          sameSite: "strict",
        });
        //  ko show password cua user tuy da dc HASH r
        //  lay toan bo ngoai tru password
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  
  
  reqRefreshToken: async (req, res) => {
    // lay cookies tu req
    const refreshToken = req.cookies.refreshToken;

    //
    if (!refreshToken) return res.status(404).json("you're not authenticated");
    // if (!refreshTokensArr.includes(refreshToken)) return res.sendStatus(403);

    //  verify refreshToken
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) return res.status(403).json("Invalid refresh token");
      const newAccessToken = authController.accessToken(user);
      const newRefreshToken = authController.refreshToken(user);

      if (err) {
        console.log(err);
      }
      // xoa di token cu va add newRefreshToken
      // refreshTokensArr = refreshTokensArr.filter((token) => refreshToken !== token )

      const result = await refreshTokens.deleteOne({ token: refreshToken });

      if (result.deletedCount === 1) {
        console.log("Token deleted successfully");
      } else {
        console.log("Token not found or not deleted");
      }
      const newRefreshTokenDB = new refreshTokens({
        token: newRefreshToken,
      });

      newRefreshTokenDB.save();

      // refreshTokensArr.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, // ms (miliseconds)a
        path: "/",
        sameSite: "strict",
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logout: async (req, res) => {
    const token = req.headers.token
    if (!token)  { 
      return res.status(400).json({message :  "No token provideds"});
    }
     
  },
};

module.exports = authController;
