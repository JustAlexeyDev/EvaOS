import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

import routerDocs from './routes/docsRoutes'
import dirRoute from './routes/dirRoutes';

app.use(routerDocs)
app.use(dirRoute)


app.get('/', (req, res) => {
    res.send("<h1>API Core more info in <a href='/api-docs'>/api-docs</a></h1>");
  });

export default app;