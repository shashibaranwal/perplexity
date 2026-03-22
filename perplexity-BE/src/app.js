import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.routes.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


// Health check route
app.get('/', (req, res) => {
  res.send('Hello, World!');
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)

export default app;