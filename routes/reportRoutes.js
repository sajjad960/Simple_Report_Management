const express = require('express');

// controller
const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController');


const router = express.Router();

// protect all routes after this middleware

router.use(authController.protect)


router.get('/', reportController.getAllReport)

// Only available for admin
router.use(authController.restrictTo('admin'))

router.post('/',reportController.createReport);
router.route('/:id').patch(reportController.updateReport).delete(reportController.deleteReport);



module.exports = router;
