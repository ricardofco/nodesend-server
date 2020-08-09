const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

connectDB();
const corsOptions = {
  origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

app.listen(port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Listen in port ${port}`);
});
