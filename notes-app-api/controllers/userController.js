const asyncHandler = require("express-async-handler");
const userSchema = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// @desc create new user
// @route POST /api/user/
// @access public
const registerUser = asyncHandler(async (_req, res) => {
    const {username, email, password} = _req.body;
    if(!username || !email || !password){
        res.status(400).json({
            "Error": "all fields are required"
        });
        throw new Error("ALL FIELDS ARE NOT FILLED");
    }
    let user = await userSchema.findOne({email});
    if(user){
        //email already exist
        res.status(400).json({
            "error": "EMAIL ALREADY EXIST"
        });
        throw new Error("EMAIL ALREADY EXIST");
    }
    user = await userSchema.findOne({username});
    if(user){
        //email already exist
        res.status(400).json({
            "error": "USERNAME ALREADY EXIST"
        });
        throw new Error("USERNAME ALREADY EXIST");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userSchema.create({
        username,
        email,
        password: hashedPassword
    });
    res.status(200).json(user);
});


// @desc login user
// @route POST /api/user/
// @access public
const loginUser = asyncHandler(async (_req, res) => {

    const {email, password} = _req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await userSchema.findOne({email});
    //comparing password
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.JWT_SECRET_TOKEN, {expiresIn: "10m"});
        res.status(200).json(accessToken);
    }
    else{
        res.status(401);
        throw new Error("email or password doesn't match");
    }
});


// @desc get currnt user information
// @route GET /api/user/
// @access private
const getCurrentUser = asyncHandler(async (_req, res) => {
    res.status(200).json(_req.user);
});

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
}
