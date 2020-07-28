const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Listen in port ${port}`);
});
