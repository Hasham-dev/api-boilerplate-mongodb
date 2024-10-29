require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);

app.use("/api/users", require("./api/userRoutes"));
app.use("/api/thoughts", require("./api/thoughtRoutes"));

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
