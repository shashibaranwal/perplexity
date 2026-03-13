import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// Health check route
app.get('/', (req, res) => {
  res.send('Hello, World!');
})

// Routes
app.use('/api/auth', authRouter)

export default app;