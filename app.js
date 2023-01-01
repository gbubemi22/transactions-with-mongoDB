const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
require('express-async-errors');




//database

const connectDB = require('./db/connect');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));



//ErrorHandlerMiddleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const walletRouter = require('./routers/walletRouter')
const transactionRouter = require('./routers/transactionsRouter')

app.use(cors());

app.get("/", (req, res) => {
     res.json({ message: "Welcome to Gbubemi CODE POINT...!" });

});

app.use('/api/wallet', walletRouter)
app.use('/api/transactions', transactionRouter)

/* EXCEPTION HANDLERS */
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 7001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();