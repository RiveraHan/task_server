const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: true }));

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/project', require('./routes/project'));
app.use('/api/task', require('./routes/task'));

app.listen(port, () => {
  console.info(`The server on port ${port}`);
});
