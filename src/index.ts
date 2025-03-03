import mongoose from 'mongoose';
import express from 'express';
import userRoutes from './routes/userRoutes';
import { connect } from './db/config';  
// Initialize Express app
const app = express();
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 8080;

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});



// Only start the server if this file is run directly
if (require.main === module) {
  connect().then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('App terminated, connections closed');
      process.exit(0);
    });
  });
}

export { app };