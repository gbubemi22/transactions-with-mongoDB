const express = require('express');
const router = express.Router();


const {
     createWallet,
     getAllWallet,
     getSingleWallet,
} = require("../controllers/walletController");

router
.route('/')
.post(createWallet);


router
.route('/')
.get(getAllWallet);


router
.route('/:id')
.get(getSingleWallet);

module.exports = router;