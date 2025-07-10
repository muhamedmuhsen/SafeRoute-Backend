import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import contactsRoute from "./routes/contacts.route.js";
import httpStatusText from "./utils/httpsStatusText.js";

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) =>
    console.log("error while connecting to database", err.message)
  );

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/contacts", contactsRoute);

// global middleware for not found router
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not available",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
