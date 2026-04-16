import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import courseRoutes from "./routes/courseRoute.js";
import lessonRoutes from "./routes/lessonRoute.js";
import enrollmentRoutes from "./routes/enrollmentRoute.js";

dotenv.config();
const app = express();

connectDB(process.env.MONGO_URI);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/courses', courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);

export default app;