
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from 'swagger-jsdoc';

import {Port} from '../Config';

const routerDocs = Router();

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "EvaOS",
        version: "0.0.1",
        description:
          "Core for EvaOS",
      },
      servers: [
        {
          url: `http://localhost:${Port}/`,
        },
      ],
    },
    apis: ["../controllers/*.ts"],
  };

  const specs = swaggerDocument(options)

routerDocs.use('/api-docs', swaggerUi.serve);
routerDocs.get('/api-docs', swaggerUi.setup(specs));


export default routerDocs;