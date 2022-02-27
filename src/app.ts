import express, { Application } from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import dotenv from 'dotenv';
import adminRoute from './routes/admin';
import customerRoute from './routes/customer';
import productRoute from './routes/product';
dotenv.config();

const app: Application = express();

// settings
const PORT = process.env.DEFAULT_PORT;
const HOST = '10.10.0.22';

app.set('port', PORT);
app.set('host', HOST);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', adminRoute);
app.use('/api', customerRoute);
app.use('/api', productRoute);

export default app;
