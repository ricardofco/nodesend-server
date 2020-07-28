/* eslint-disable no-console */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Conexión exitosa');
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = connectDB;
