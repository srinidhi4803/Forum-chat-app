import express, { Router } from 'express';
import dotenv from 'dotenv';
import routes from './Routes/routes.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

