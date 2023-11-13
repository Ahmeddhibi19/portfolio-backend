/*const express = require("express");
const app = express();
const port = 5000;
const cors= require("cors");
const {connectDB}= require("./connection");
const routes=require("./routes/routes");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser'); // Add this line

const mongoose = require('mongoose');
require("dotenv").config();
//connection to DB
connectDB();
//Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use("/api",routes);


//listening to server
app.get("/",(req,res)=> res.send("hello world"));
app.listen(port,()=>console.log(`Server is running on port ${port}`));





const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  });
  
  const FormDataModel = mongoose.model('FormData', formDataSchema);
  
  app.post('/submit', async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      const formData = new FormDataModel({ name, email, message });
      await formData.save();
  
      res.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
  /*app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });*/

  // server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add this line

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://ahmeddhibicv.onrender.com', // Replace with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

app.post('/submit', async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      const formData = new FormDataModel({ name, email, message });
      await formData.save();
  
      res.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
