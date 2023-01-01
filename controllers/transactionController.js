const Transactions = require('../models/Transaction');
const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { creditAccount, debitAccount } = require( '../utils/transactions');
const { StatusCodes } = require("http-status-codes");


const transfer = async (req, res) => {
     const session = await mongoose.startSession();
     session.startTransaction()
     try {
         const { toUsername, fromUsername, amount, summary, tranxType} = req.body;
         const reference = v4();
         if (!toUsername && !fromUsername && !amount && !summary && !tranxType) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 status: false,
                 message: 'Please provide the following details: toUsername, fromUsername, amount, summary, tranxType'
             })
         }
 
       const transferResult = await Promise.all([
         debitAccount(
           {amount, username:fromUsername, purpose:"payment", reference, summary, tranxType: "CR",
           trnxSummary: `TRFR TO: ${toUsername}. TRNX REF:${reference} `, session}),
         creditAccount(
           {amount, username:toUsername, purpose:"payment", reference, summary,
           tranxType: "DR", trnxSummary:`TRFR FROM: ${fromUsername}. TRNX REF:${reference} `, session})
       ]);
 
       const failedTxns = transferResult.filter((result) => result.status !== true);
       if (failedTxns.length) {
         const errors = failedTxns.map(a => a.message);
         await session.abortTransaction();
         return res.status(StatusCodes.BAD_REQUEST).json({
             status: false,
             message: errors
         })
       }
 
       await session.commitTransaction();
       session.endSession();
 
       return res.status(201).json({
         status: true,
         message: 'Transfer successful'
     })
     } catch (err) {
         await session.abortTransaction();
         session.endSession();
 
         return res.status(500).json({
             status: false,
             message: `Unable to find perform transfer. Please try again. \n Error: ${err}`
         })
     }
 }


 module.exports = transfer;