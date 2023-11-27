const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/.env` });

process.on('uncaughtException', (err) => {
    console.log('Uncaught exception shutting down');
    console.log(err.name, err.message);
    process.exit(1);
  });

const app = require("./app");

// Database Connection
mongoose.connect(process.env.LOCAL_DATABASE, { useNewUrlParser: true }).then(() => console.log("DB connection successful"))


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running on the port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION 😊 shuting down');
    server.close(() => {
      process.exit(1);
    });
  });