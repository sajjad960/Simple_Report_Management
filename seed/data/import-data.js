const fs = require("fs");
const mongoose = require("mongoose");
let dotenv = require("dotenv");
const Reports = require("../../models/reportModel");

dotenv.config({ path: "./.env" });
mongoose.connect(process.env.LOCAL_DATABASE, { useNewUrlParser: true }).then(() => console.log("DB connection successful"))


// Read json file
const reports = JSON.parse(
  fs.readFileSync(`${__dirname}/reports.json`, "utf-8")
);

//import data into db

const importData = async () => {
  try {
    await Reports.create(reports);
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from db

const deleteData = async () => {
  try {
    await Products.deleteMany();
    console.log("data successfully deleted");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// for execute this file run 
// node data/import-data.js --import