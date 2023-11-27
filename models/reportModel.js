const mongoose = require('mongoose');
const baseModel = require('./baseModel');

const reportSchema = new mongoose.Schema({
    ...baseModel,
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    profession: {
        type: String,
    },
    favoriteColors: {
        type: [String],
    }
})

// created unique index for stationName and StationChannel. 
// stationSchema.index({ stationName: 1, stationChannel: 1 }, { unique: true })

const Reports = mongoose.model('reports', reportSchema)

// //test Station
// const testStation = new Stations({
//   stationName: "Sajjad",
//   stationChannel: "77,8",
// });

// testStation.save().then((doc) => console.log(doc));

module.exports = Reports;