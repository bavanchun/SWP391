const { default: mongoose } = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const pagination = {
  paginationGetAll  :  async (page, limit, collectionName) => {
  const client = new MongoClient(process.env.DB_URI);
  const db = client.db("test");
  const collection = db.collection(collectionName);

  console.log(page * limit);
  
  try {
    const skip = (page - 1) * limit;
    
    const listCollection = await collection
      .find()
      .sort({  elementID : 1})
      .skip(skip)
      .limit(limit)
      .toArray();
      console.log(page ,  limit);
      
      
     const totalDocuments = await collection.countDocuments();
    return {
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      totalDocuments: totalDocuments,
      data: listCollection,
    };
  } catch (err) {
    throw err;
  }
} , 

  paginationForSearch : async (page, limit, collectionName  ,value ) => {
  const client = new MongoClient(process.env.DB_URI);
  const db = client.db("test");
  const collection = db.collection(collectionName);

  console.log(page , limit);
  
  try {
    const skip = (page - 1) * limit;
    
    const listCollection = await collection
      .find({ koiName : {$regex :value , $options :"i"}})
      .skip(skip)
      .limit(limit)
      .toArray();
    
    
    
    const countListCollection = listCollection.length

  
    return {
      currentPage: page,
      totalPages: Math.ceil(countListCollection / limit),
      totalDocuments: countListCollection,
      data: listCollection,
    };
  } catch (err) {
    throw err;
  }
}
}

 



module.exports = pagination;