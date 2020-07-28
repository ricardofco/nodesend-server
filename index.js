const express = require('express');
const connectDB = require('./config/database');

const app = express();

connectDB();

const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Listen in port ${port}`);
});
