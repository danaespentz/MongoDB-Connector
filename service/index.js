require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const mongoString = process.env.DATABASE_URL;

mongoose.set('strictQuery', true);

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const routes = require('./routes/routes');
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
