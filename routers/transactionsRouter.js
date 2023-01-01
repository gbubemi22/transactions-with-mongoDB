const express = require('express');
const router = express.Router();

const transfer = require('../controllers/transactionController');

router
.route('/transfer')
.post(transfer)
// .get(transfer);

// router
// .route('transfer/:id')
// .get(transfer);





module.exports = router;