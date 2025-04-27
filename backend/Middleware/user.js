const {User} = require("../db")
async function usermiddleware(req,res,next){
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })    
    .then(function(user){
        if(user){
            
            
          req.user=user
            next();
        }
        else{
            res.json({msg:"user does not exist"})
            
        }
    })
}
module.exports= usermiddleware