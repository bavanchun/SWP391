
const router = require("express").Router();
const Ponds = require("../models/pond"); 

router.get("/" , async(req , res) => {
    try {
         const pond = await Ponds.find({});
         res.status(200).json(pond);
    } catch (error) {
        res.status(500).json(error)
    }
   
})

module.exports  = router