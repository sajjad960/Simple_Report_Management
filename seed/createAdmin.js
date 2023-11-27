const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Users = require('../models/userModel');

dotenv.config({ path: './.env' });

mongoose.connect(process.env.LOCAL_DATABASE, { useNewUrlParser: true }).then(() => console.log("DB connection successful"))

const testUser = new Users({
    name: "sajjad",
    phone: "01650103297",
    role: "admin",
    address: "mahammadpur",
    profession: "full stack developer",
    favoriteColors: ["black", "blue"],
    email: "admin@gmail.com",
    password: "sajjad5522",
    passwordConfirm: "sajjad5522"
});

testUser.save().then((doc) => console.log(doc, "admin created"));