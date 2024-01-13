// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Customer = require('./models/customer');
const seedCustomers = require('./seed-database');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI='mongodb+srv://bellaniramesh95:Ramesh1234@cluster0.acfampl.mongodb.net/yourDatabaseName'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("MongoDB Connected!!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});


// Home Page
app.get('/', (req, res) => {
  res.render('home');
});

// View all Customers
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.render('customers', { customers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// View one Customer
app.get('/customer/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId);
    res.render('customer', { customer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Transfer Money
app.get('/transfer/:id', async (req, res) => {
  const senderId = req.params.id;
  try {
    const sender = await Customer.findById(senderId);
    const customers = await Customer.find();
    res.render('transfer', { sender, customers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Handle Transfer
app.post('/transfer/:id', async (req, res) => {
    const senderId = req.params.id;
    const receiverId = req.body.receiver;
    const amount = parseInt(req.body.amount);
  
    try {
      const sender = await Customer.findById(senderId);
      const receiver = await Customer.findById(receiverId);
  
      if (sender && receiver && amount > 0 && sender.currentBalance >= amount) {
        sender.currentBalance -= amount;
        receiver.currentBalance += amount;
  
        await sender.save();
        await receiver.save();
      }
    } catch (err) {
      console.error(err);
    }
  
    res.redirect('/customers');
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
