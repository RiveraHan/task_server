const mongoose = require("mongoose");
require("dotenv").config({ path: "example.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect("http://localhost:27017/tasks", {
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
