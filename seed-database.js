// seed-database.js
const mongoose = require('mongoose');
const Customer = require('./models/customer');
require('dotenv').config();

const customersData = [
  { name: 'Krishna', email: 'customer1@example.com', currentBalance: 1000000 },
  { name: 'Ajay', email: 'customer2@example.com', currentBalance: 17500 },
  { name: 'Ram', email: 'customer3@example.com', currentBalance: 2500 },
  { name: 'Mohan', email: 'customer4@example.com', currentBalance: 3500 },
  { name: 'Ramesh', email: 'customer5@example.com', currentBalance: 1500 },
  { name: 'Anu', email: 'customer6@example.com', currentBalance: 1500 },
  { name: 'sumo', email: 'customer7@example.com', currentBalance: 1500 },
  { name: 'raj', email: 'customer8@example.com', currentBalance: 1500 },
  { name: 'madhu', email: 'customer9@example.com', currentBalance: 1500 },
  { name: 'sudha', email: 'customer10@example.com', currentBalance: 1500 },
];

async function seedCustomers() {
  try {
    await Customer.insertMany(customersData);
    console.log('Customers seeded with dummy data');
  } catch (err) {
    console.error('Error seeding customers:', err);
  }
}

module.exports = seedCustomers;
