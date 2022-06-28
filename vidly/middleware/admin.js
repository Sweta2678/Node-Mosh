
function isAdminCheck(req,res,next){

    //403 - forbidden
    if(!req.user.isAdmin) return res.status(403).send('Access Denied');
    next();
}

module.exports = isAdminCheck;