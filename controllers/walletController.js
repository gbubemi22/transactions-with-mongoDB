const Wallet = require('../models/Wallet');



const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");


const createWallet = async (req, res) => {     
     
  const { username } = req.body;
     const wallectExits = await Wallet.findOne({username});

     if(wallectExits) {
      throw new CustomError.ConflictError({
        status: false,
        message: `Wallect already exits`
      })
     }
     const wallet = await Wallet.create({username});
      
     res.status(StatusCodes.CREATED).json({
       status: true,
       messages: "Wallet created successfully",
       data: wallet,
     });
   };


   const getAllWallet = async (req, res) => {
    const wallets = await Wallet.find({})

    res.status(StatusCodes.OK).json({ wallets})
   }

   const getSingleWallet = async (req, res) => {
    const { id: walletId } = req.params;

    const wallet = await Wallet.findById({id: walletId })

    if(!wallet) {
      throw new CustomError.NotFoundError(`No Wallet with id: ${walletId}`)
    }
    res.status(StatusCodes.OK).json({ wallet })
   }
   
   module.exports = {
    createWallet,
    getAllWallet,
    getSingleWallet,
   };