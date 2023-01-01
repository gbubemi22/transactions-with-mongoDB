const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    username: {
       type: String,
       required:true,
       trim: true,
       immutable: true,
       unique: true,
    },
    balance: {
        type: mongoose.Decimal128,
        required: true,
        default: 0.00
    }
}, { timestamps: true });



const Wallet = mongoose.model('Wallet', WalletSchema);
module.exports = Wallet;