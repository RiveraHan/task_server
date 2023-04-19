const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    // eslint-disable-next-line no-console
    console.info('Connected DB');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
