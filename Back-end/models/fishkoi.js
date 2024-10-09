const { default: mongoose } = require("mongoose");
// import mongoose from 'mongoose';

<<<<<<< HEAD
const  fishKoiSchema = mongoose.Schema( {
    elementID : {
        type : String
    },
    koiName : {
        type : String
    },
    description : {
        type : String
    }, 
    image  : {
        type : String
    },
    colors : { 
        type : [String]
    }
})
=======
const fishKoiSchema = mongoose.Schema({
  elementID: {
    type: Number,
  },
  koiName: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  colors: {
    type: [String],
  },
});
>>>>>>> Phat-Backend

module.exports = mongoose.model("fishkois", fishKoiSchema);
