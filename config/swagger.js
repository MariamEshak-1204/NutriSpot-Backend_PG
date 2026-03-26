// Server 

// https://nutri-spot-backend-pg.vercel.app/api-docs

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import "../config/swagger_schemas.js";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Graduation Project API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://nutri-spot-backend-pg.vercel.app",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./routes/*.js" ,
    "./config/swagger_schemas.js"
  ],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
