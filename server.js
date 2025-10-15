import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
const localFallback = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MongoDB connection error: MONGO_URI (or MONGO_URL) is not set');
} else {
  const tryConnect = async (uri) => {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected');
      return true;
    } catch (err) {
      console.log('MongoDB connection error:', err);
      return err;
    }
  };

  (async () => {
    const result = await tryConnect(mongoUri);
    if (result !== true) {
      const isNetworkErr = result && (result.code === 'ENOTFOUND' || result.code === 'ECONNREFUSED' || (result.message && result.message.includes('querySrv')));
      if (isNetworkErr) {
        console.warn('Primary MongoDB failed — attempting local fallback:', localFallback);
        const fallbackResult = await tryConnect(localFallback);
        if (fallbackResult !== true) {
          console.error('Local fallback also failed.');
        }
      } else {
        console.error('MongoDB primary connection failed with non-network error.');
      }
    }
  })();
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Debug: log whether JWT secret is present (do not print the secret itself)
if (!process.env.JWT_SECRET) {
  console.warn('[server] JWT_SECRET is not set in environment variables. Token verification will fail.');
} else {
  console.debug('[server] JWT_SECRET found in environment variables');
}
