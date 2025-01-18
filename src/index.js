// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'  // for code consistency
import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})

connectDB()