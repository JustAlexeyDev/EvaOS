import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import imageRoutes from './routes/imageRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/images', imageRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });

export default app;