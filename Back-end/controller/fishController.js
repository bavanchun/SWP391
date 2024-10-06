const fishkois = require("../models/fishkoi"); 
const paginations  = require("../controller/pagination");
const { search } = require("../routes/oauth");
const { MongoClient } = require("mongodb");
require("dotenv").config();


const fishController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page || 1);
      const limit = parseInt(req.query.limit || 10);
      console.log({ page, limit });

      const result = await paginations.paginationGetAll(
        page,
        limit,
        "fishkois"
      );

      if (result.currentPage > result.totalPages) {
        return res.status(404).json("Data not found");
      }

      return res.status(200).json({ result });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const fishkoi = await new fishkois({
        elementID: req.body.elementID,
        koiName: req.body.koiName,
        description: req.body.description,
        image: req.body.image,
        colors: req.body.colors,
      });
      await fishkoi.save();
      return res.status(200).json({ message: "create success", fishkoi });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const idObject = req.params.id;
      console.log(idObject);

      const Fkoi = await fishkois.findByIdAndDelete(idObject);
      console.log(Fkoi);

      return res.status(200).json({ message: "delete success" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const idObject = req.params.id;
      const updateData = req.body;
      const updateFishKoi = await fishkois.findByIdAndUpdate(
        idObject,
        { $set: updateData },
        {
          new: true,
          runValidator: true,
        }
      );
      if (!updateFishKoi) {
        return res.status(404).json("fish not found");
      }
      return res.status(200).json(updateFishKoi);
    } catch (err) {
      return res.status(500).json(err);
    }
  },



   search : async (req, res) => {

     const client = new MongoClient(process.env.DB_URI);
     const db = client.db("test");
     const Cfishkois = db.collection("fishkois");
  
    
    try {
      const searchName = req.query.searchName  || "";
     // const searchColor = req.query.searchColor || "";
      const searchColor = req.query.searchColor ?  req.query.searchColor.split(",") : [];
      const page = parseInt(req.query.page || 1);
      const limit = parseInt(req.query.limit || 10);
      const sortOrder = req.query.sortOrder || "asc";
      const sortBy = parseInt(req.query.sortBy) || 0;

      // tao doi tuong searh filter
      const searchFilter = {};

      const skip = (page - 1) * limit;
      // xây dựng điều kiệm tìm kiếm
      const sortByValue = ["elementID", "koiName"];
      const sortOrderValue = sortOrder === "asc" ? 1 : -1;

      const sortOptions = {
        [sortByValue[sortBy]]: sortOrderValue,
      };
  
      
      // tim kiem thuoc ve color
      console.log(typeof color);
      // dieu kien 1 neu tim name
      if (searchName)  searchFilter.koiName = { $regex: searchName, $options: "i" };
      // dieu kien 2 tim color 
      if (searchColor.length > 0)  {
        searchFilter.colors = { $in: searchColor };
      };
      
     const listCollection  = await Cfishkois.find(searchFilter)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
        .toArray();

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(listCollection.length / limit),
        totalDocuments: listCollection.length,
        data: listCollection,
      });
    } catch (err) {
      res.status(500).json({message : err});
    }
   } ,

   getKoiByElement  : async(req ,res) => {
       try {
     
         console.log("query " + req.query.elementID);
         //get bang body
         // const fishkoi = await fishkois.find({elementID : parseInt(data.elementID) });

         //get bang query
         const fishkoi = await fishkois.find({
           elementID: parseInt(req.query.elementID),
         });
         console.log(typeof fishkoi);
         console.log(fishkoi.length);

         if (fishkoi.length === 0) {
           return res.status(403).json("data is not found");
         }
         return res.status(200).json({ fishkois: fishkoi });
       } catch (err) {
         return res.status(500).json({ message: err });
       }
   }
};

module.exports = fishController