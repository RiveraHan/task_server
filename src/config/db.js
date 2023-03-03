const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.info("DB Conectada");
  } catch (error) {
    console.log("hubo un error");
    console.error(error);
    process.exit(1); // Detener la app
  }
};

module.exports = conectarDB;
