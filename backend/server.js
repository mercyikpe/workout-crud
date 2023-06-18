require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/", (req, res) => {
  res.json({ message: "api is running" });
});
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT;
    // listen for requests on a port number
    app.listen(port, () => {
      console.log(`connected to DB and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
