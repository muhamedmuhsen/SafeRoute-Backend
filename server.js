/**
 * Main server entry point
 */
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import contactsRoute from "./routes/contacts.route.js";
import sosRoute from "./routes/sos.route.js";
import httpStatusText from "./utils/httpsStatusText.js";

dotenv.config();
const app = express();

app.use(express.json());

// Database connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("Error while connecting to database:", err.message);
    process.exit(1);
  }
}
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/contacts", contactsRoute);
app.use("/api/sos", sosRoute);

// 404 handler
app.all("*", (req, res) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This resource is not available",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    status: error.text || httpStatusText.ERROR,
    message: error.message,
    code: error.code || 500,
    data: null,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
