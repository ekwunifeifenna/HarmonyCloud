const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB database connection established successfully');
})

connection.on('error', (err) => {
  console.log('MongoDB connection error: ' + err);
})

module.exports = mongoose;