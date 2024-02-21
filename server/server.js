const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const userRoute = require('./routes/userRoute');

app.use('/api/user', userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
})