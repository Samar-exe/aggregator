const jwt = require('jsonwebtoken')
const masterModel = require('../models/MasterModel')

module.exports.isMasterLoggedIn = async(req,res,next)=>{
    if(!req.cookies.masterToken){
        res.send("Invalid")
    }
    try{
        let decoded = jwt.verify(req.cookies.masterToken, "zubairis@g@@dboy")
        let master = await masterModel.findOne({email:decoded.email}).select("-password")
        req.master = master;
        next()
    }catch(err){
        res.send("Invalid Token")
    }
}