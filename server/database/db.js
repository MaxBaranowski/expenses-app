var mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

// connect to DataBase
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds245647.mlab.com:45647/${process.env.DB_DATABASE_NAME}`,
  {
    useNewUrlParser: true
  }
);
