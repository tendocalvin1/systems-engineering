import express from 'express';

const app = express();  // create an express app

app.use(express.json())

// routes import
import UserRouter from './routes/user.routes.js';


// routes declaration
app.use('/api/v1/users', UserRouter)


// example route: http://localhost:8000/api/v1/users/register


export default app;