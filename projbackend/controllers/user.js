const User = require("../models/user");
const Order = require("../models/order");

// get user by id works with params becauyse there's a id there
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
    });
};



exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        // Below both are the essential parameteres which we have to pass along
        {new: true, userFindAndModify: false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "Not Able to Update Information"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    )
}


exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "id name")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "No order in this User"
            });
        }
        return res.json(order);
    });
}