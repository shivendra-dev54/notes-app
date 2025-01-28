const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_STRING);
        console.log("connected to the DB");
    }
    catch(err){
        console.log("unable to connect");
    }
}

module.exports = dbConnect;