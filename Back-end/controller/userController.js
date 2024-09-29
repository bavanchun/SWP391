const User = require("../models/user");
const packageMember = require("../models/packageMember");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const pagination = require("./pagination");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multer");
const { UploadStream } = require("cloudinary");

require("dotenv").config();

const useController = {
  pagination: (collectionName) => {
    const client = new MongoClient(process.env.DB_URI);
    const db = client.db("test");
    return db.collection(collectionName);
  },
  getAllUsr: async (req, res) => {
    const userCollection = useController.pagination("users");

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
      const user = await userCollection
        .find()
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray();
      console.log(user);

      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(user.length / limit),
        totalDocuments: user.length,
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

      // check account id da dk goi member hay chua
      const isExist = packageMember.find({ accountID: id });
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
      const updateUser = await User.findByIdAndUpdate(id, {
        memberStatus: true,
      });

      // save  to database
      const newpackageMembers = await packageMem.save();
      updateUser.save();
      // res to json
      return res.status(200).json({ newpackageMembers });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  search: async (req, res) => {
    const Cuser = useController.pagination("users");
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

      const sortByValue = ["name", "createdAt"];

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

      const listCollection = await Cuser.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
        .toArray();

      return res.status(200).json({
        pageCurrent: page,
        totalPage: Math.ceil(listCollection.length / limit),
        totalDocuments: listCollection.length,
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
};

module.exports = useController;
