const { model } = require("mongoose");
const Orders = require("../models/orders");
const User = require("../models/user");
const packageMember = require("../models/packageMember");

const orderController =  {
    getAllOrder :  async(req , res) => {
        try {
        //   const page = parseInt(req.query.page) || 1;
        //   const limit = parseInt(req.query.limit) || 10;
    
        const   {
            page  =  1, 
            limit = 10, 
         } = req.query
        
          const skip = (page - 1) * limit;
          const user = await  Orders.find()
            .skip(skip)
            .limit(limit);

          const totalDocuments = await Orders.countDocuments();
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
    deleteOrder : async (req ,res) => {
        try {
        const id = req.params.id; 
        console.log(id);
        
        // const result = await Orders.findByIdAndDelete(id);
          const result = await Orders.find({_id : id});
        if (result) {
            return res.status(200).json({message : "delete order successfull"})
        }
    }catch (err) {
        return res.status(500).json({err})
    }
    }, 
    viewProfileUser : async (req , res) => { 
      try {
         const result = await User.findOne({_id : req.query.id });
         if (result) { 
          return res.status(200).json(result)
         }
      } catch (err) {
        return res.status(500).json(err)
      }
    }
    
    
}

module.exports = orderController;