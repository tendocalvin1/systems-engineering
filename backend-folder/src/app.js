import express from 'express';
// routes import
import UserRouter from './routes/user.routes.js';

const app = express();  // create an express app

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// routes declaration
app.use('/api/v1/users', UserRouter)

// example route: http://localhost:8000/api/v1/users/register

export default app;