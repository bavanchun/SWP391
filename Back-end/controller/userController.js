const User = require("../models/user");
const packageMember = require("../models/packageMember");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multer");
const { UploadStream } = require("cloudinary");
const fs = require("fs");



require("dotenv").config();

const useController = {
  
  getAllUsr: async (req, res) => {
    

    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10;
      const sortOrder = req.query.sort || "asc";
      const sortBy = parseInt(req.query.sortBy) || 0;

      const sortByValue = ["name"];
      const sortOrderValue = sortOrder == "asc" ? 1 : -1;
      const sortOptions = {
        [sortByValue[sortBy]]: sortOrderValue,
      };

      const skip = (page - 1) * limit;
      const user = await User
        .find()
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
      

        
      const totalDocuments = await User.countDocuments(); 
      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: user,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      // neu muon xoa mot user trong Database thi findByIdandDelete
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("DELETE SUCCESSFULLY ");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createUser : async (req, res) => {
    try {
    
      const {
        userName,
        name,
        email,
        password,
        admin,
        phoneNumber,
        avatar,
        memberStatus,
        gender,
        birthDate,
      } = req.body;

      const data =  {
        userName,
        name , 
        email, 
        password,
        admin,
        phoneNumber, 
        avatar, 
        memberStatus, 
        gender, 
        birthDate, 

      }
      // hash  password
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password , salt);
        data.password = hashPassword;
      }
       
    
    const nUser =  new User(data); 
    await nUser.save();
    return res.status(200).json("successfull create new User");
    }catch (err) {
      if (err.code === 11000) {
        return res.status(500).json(err.errmsg);
      }
      return res.status(500).json(err)
    }
  }, 
  updateUser: async (req, res) => {
    try {
      const idUser = req.params.id; 
      const updateData = req.body;

      console.log(idUser);
        
      // hash Password
      if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPawssword = await bcrypt.hash(updateData.password, salt);
        updateData.password = hashedPawssword;
      }

      const updateUsr = await User.findByIdAndUpdate(idUser, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updateUsr) {
        return res.status(404).json({ error: "User Not found" });
      }
      // neu muon update sai save()
      // await updateUsr.save();
      console.log(updateUsr);
      
      res.status(202).json(updateUsr);

    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json("Not found user");
      }

      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  subcribeMemberShip: async (req, res) => {
    try {
      const packageType = req.body.packageType;
      const id = req.body.id;

      console.log(id);
      
      // check account id da dk goi member hay chua
      const isExist = await packageMember
        .findOne({ accountID: req.body.id })
        .populate("accountID");
      console.log(isExist);
      
      if (isExist) {
        return res.status(403).json({ error: "account was subcribe member" });
      }

      let day;
      let Name = " ";
      switch (packageType) {
        case "0":
          day = 30;
          Name = "Basic";
          break;
        case "1":
          day = 60;
          Name = "advanced";
          break;
        case "2":
          day = 90;
          Name = "Plus";
          break;
        default:
          return res.status(404).json({ error: "invalid package type" });
          break;
      }
      let DateExpires = new Date(Date.now() + day * 24 * 60 * 60 * 1000);
      const packageMem = new packageMember({
        accountID: id,
        name: Name,
        expires: DateExpires,
      });

      // update status member
      // const updateUser = await User.findByIdAndUpdate(id, {
      //   memberStatus: true,
      // });

      // save  to database
      const newpackageMembers = await packageMem.save();
      
      // res to json
      return res.status(200).json({newpackageMembers , message : "need proccess payment"});
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  search: async (req, res) => {
    
    try {
      // const searchName = req.query.sName|| "";
      // const searchUserName = req.query.sUserName ||  "";
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const sortBy = req.query.sort || 0;
      const sortOrder = req.query.sortOrder || "asc";
      const skip = (page - 1) * limit;
      // request query
      const { searchName, searchUserName } = req.query;

      const sortByValue = ["name", "createdAt" ];

      let sortOrderValue;
      // option sort
      switch (sortOrder) {
        case "asc":
          sortOrderValue = 1;
          break;
        case "desc":
          sortOrderValue = -1;
          break;
        default:
          sortOrderValue = 1;
          break;
      }

      // sort options
      const sortOptions = {
        [sortByValue[sortBy]]: sortOrderValue,
      };
      console.log(sortOptions);

      // storage
      let query = {};
      if (searchName && !searchUserName) {
        query.name = {
          $regex: searchName,
          $options: "i",
        };
      }
      if (!searchName && searchUserName) {
        query.userName = {
          $regex: searchUserName,
          $options: "i",
        };
      }
      if (!searchName && !searchUserName) {
        query = {};
      }
      console.log(query);

      const listCollection = await User.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
        

      // dem tong data trong 1 collection 
       const totalDocuments = await User.countDocuments();
        
      return res.status(200).json({
        pageCurrent: page,
        totalPage: Math.ceil(totalDocuments  / limit),
        totalDocuments: totalDocuments,
        data: listCollection,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  uploadImage: async (req, res) => {
    console.log(req.file);
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "avatar" },
      function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        return res.status(200).json({ data: result.secure_url });
      }
    );
  },
  uploadImages : async (req ,res ) => {
    try { 
       console.log(req.files);
      // kiem tra xem các file có được upload
       if (!req.files || req.files.length === 0) {
         return res.status(400).json({
           success: false,
           message: "No files uploaded",
         });
       }
    //

      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {  
          folder: "post",
        });
      });

      const results = await Promise.all(uploadPromises);
      console.log(" RESULT AFTER UPLOAD  CLOUDINARY  : "+ results);
      
      // lam trong thu muc upload sau khi  được upload lên cloud
         req.files.forEach((file) => {
           fs.unlink(file.path, (err) => {
             if (err) {
               console.error("Error deleting file:", err);
             }
           });
         });
   
       const urls = results.map((result) => result.secure_url);
      
      return res.status(200).json(
        {
          success : true, 
          data : urls
        }
      )
     
    }catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while uploading the images",
      });
    }
  }
};

module.exports = useController;
