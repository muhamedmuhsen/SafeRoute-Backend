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
import { Server } from "socket.io";
import http from 'http'
import cors from 'cors';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New connection established:', socket.id);
  
  socket.on('location-sent', (data) => {
    console.log('Location received from:', socket.id, data);
    // TODO: send last location to trusted contacts
    // You can emit to specific rooms or broadcast to all connected clients
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

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
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


