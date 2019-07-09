const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

let db = mongoose.connection;

// connect to DataBase
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds245647.mlab.com:45647/${process.env.DB_DATABASE_NAME}`
);

// check for mMngoDb connection
db.once("open", function() {
  console.log("| Connection to MongoDB |");
});

// check for DB error
db.once("error", function(err) {
  console.log(err);
});
