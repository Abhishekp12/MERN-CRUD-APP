require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', userRouter);

// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Start server
app.listen(port, () => console.log(`Server started at port: ${port}`));


 
