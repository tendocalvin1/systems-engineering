import express from 'express';
const app = express();  // create an express app

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// routes import
import UserRouter from './routes/user.routes.js';
import PostRouter from './routes/post.route.js';



// routes declaration
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/posts', PostRouter);

// example route: http://localhost:8000/api/v1/users/register

export default app;