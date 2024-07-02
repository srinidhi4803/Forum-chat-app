import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
import UserRoutes from './routes/user.routes.js';
import cors from 'cors';

dotenv.config();

//connect to database
connectDB();

//initialize express
const app = express();

//use middleware
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//use routes
app.use('/api/user',UserRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

