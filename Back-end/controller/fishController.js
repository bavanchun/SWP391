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
  //  search : async (req, res) => {
  //   try {
  //     const keyword = req.query.key;
  //     const page = parseInt(req.query.page || 1);
  //     const limit =parseInt(req.query.limit || 10);
  //     const result = await paginations.paginationForSearch(page, limit, "fishkois",keyword);

  //    return res.status(200).json({result})
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  //  } ,


   search : async (req, res) => {

     const client = new MongoClient(process.env.DB_URI);
     const db = client.db("test");
     const Cfishkois = db.collection("fishkois");
  
    
    try {
      const search = req.query.search || "";
      const page = parseInt(req.query.page || 1);
      const limit = parseInt(req.query.limit || 10);
      const sortOrder = req.query.sortOrder || "asc";
      const sortBy = parseInt(req.query.sortBy) || 0;
     
      const skip = (page - 1) * limit;
      // xây dựng điều kiệm tìm kiếm
      const sortByValue = ["elementID", "koiName"];
      const sortOrderValue = sortOrder === "asc" ? 1 : -1;

      const sortOptions = {
        [sortByValue[sortBy]]: sortOrderValue,
      };
  
      
      // tim kiem thuoc ve color
      console.log(typeof color);
    
      
      
     const listCollection  = await Cfishkois.find({
        koiName: { $regex: search, $options: "i" },
    
      })
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
   searchColor : async(req , res ) => {
      const client = new MongoClient(process.env.DB_URI);
      const db = client.db("test");
      const Cfishkois = db.collection("fishkois");
    try {
       const color = parseInt(req.query.color) || "";
        const page = parseInt(req.query.page ) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortOrder = req.query.sortOrder || "asc";
        const sortBy = parseInt(req.query.sortBy) || 0;
        
        const skip = (page -1) * limit;
         const colorValue = [
           "yellow",
           "green",
           "blue",
           "red",
           " brown",
           "black",
         ];

           const sortByValue = ["elementID", "koiName"];
           const sortOrderValue = sortOrder === "asc" ? 1 : -1;

           const sortOptions = {
             [sortByValue[sortBy]]: sortOrderValue,
           };
         console.log(colorValue[color]);
         

         const listCollection = await Cfishkois.find({
           colors: { $regex: color, $options: "i" },
         })
           .skip(skip)
           .limit(limit)
           .sort(sortOptions)
           .toArray();

        console.log(listCollection);
        
        return    res.status(200).json({
             currentPage: page,
             totalPages: Math.ceil(listCollection.length / limit),
             totalDocuments: listCollection.length,
             data: listCollection,
           });
      
    } catch (err) {
      return res.status(500).json(err)
    }
   },
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