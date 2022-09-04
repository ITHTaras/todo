const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
// Database
const port = process.env.PORT;
const connectDB = require("./config/db");

connectDB();

// Middlewares
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

// APP USE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Import Routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Deployment
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
}

// Error Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`.cyan);
});
