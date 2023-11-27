const Reports = require('../models/reportModel')
const handleFactory = require('./handleFactory')


exports.createReport = handleFactory.createOne(Reports);
exports.getAllReport = handleFactory.getAll(Reports);
exports.updateReport = handleFactory.updateOne(Reports);
exports.deleteReport = handleFactory.deleteOne(Reports);