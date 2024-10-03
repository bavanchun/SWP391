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
router.get('/searchKoiColor' , fishController.searchColor);
// laya ra nhung co ca koi cung ban menh 
router.get('/getKoiElement'  , fishController.getKoiByElement);

module.exports = router