const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log('App is running at port 5000');
});
