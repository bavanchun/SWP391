const router = require("express").Router();
const fishkois = require("../models/fishkoi");
const middleware = require("../controller/middlewareController");
const  fishController = require("../controller/fishController");

//
router.get('/' , fishController.getAll);
//  v1/fish/createKoi
router.post('/createKoi',fishController.create);
// v1/fish/deleteKoi
router.delete('/deleteKoi/:id' ,middleware.verifyTokenAdminAuth, fishController.delete);
//v1/fish/updateKoi/:id
router.put('/updateKoi/:id' ,middleware.verifyTokenAdminAuth ,fishController.update);
// v1/fish/search/
router.get('/searchKoiName',fishController.search);
router.get('/searchKoiColor' , fishController.searchColor)
// laya ra nhung co ca koi cung ban menh 
router.get('/getKoiElement'  , async(req ,res) => {
    try {
    
        console.log(req.elementID);
        console.log("query "+req.query.elementID);
        //get bang body
        // const fishkoi = await fishkois.find({elementID : parseInt(data.elementID) });

        //get bang query
        const fishkoi = await fishkois.find({
        elementID : parseInt(req.query.elementID)
        });
        console.log(typeof  fishkoi)
        console.log(fishkoi.length);
        
          if (fishkoi.length === 0) {
            return res.status(403).json("data is not found")
        }
     return    res.status(200).json({fishkois : fishkoi});
        
    }catch (err ) {
       return  res.status(500).json({message  : err})
    }
})

module.exports = router