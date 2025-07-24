import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route to show something in browser
app.get('/', (req, res) => {
  res.send('✅ Welcome to the OneDay backend!');
});

// ✅ Auth routes
app.use('/api/auth', authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
