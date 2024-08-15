import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import vetRoutes from './routes/vetRoutes.js';

const app = express();
app.use(express.json()); // to send data as json

dotenv.config()
connectDB();

app.use('/api/vets', vetRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server on port: ${port}`);
});

