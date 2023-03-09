const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.info('Connected DB');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
