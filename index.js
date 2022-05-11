import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import logger from 'morgan';
import cookieParser from "cookie-parser";

import sellerRoute from './src/seller/routes/index.js';
import clientRoutes from './src/clients/routes/index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));
app.use(logger('dev'));
app.use(cookieParser());

app.use("/seller", sellerRoute);
app.use("/", clientRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: `server is running fine` });
});

mongoose.connect(MONGO_URI)
    .then(res => console.log(`connection successfull with ${res.connection.host}`))
    .catch(err => console.log(`Opps Can't connect with Database\n ${err}`));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));