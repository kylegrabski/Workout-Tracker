const express = require("express");
const logger = require("morgan");
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(require("./routes/api.js"));
app.use(require("./routes/index.js"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => console.log(`App listening to localhost:${PORT}`));
