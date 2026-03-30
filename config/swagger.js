// Server 
// https://nutri-spot-backend-pg.vercel.app/api/docs

import swaggerJsdoc from "swagger-jsdoc";
import "../config/swagger_schemas.js";
import "../routes/home_routes.js"
import "../routes/user_routes.js"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nutri Spot API",
      version: "1.0.0",
      description: "API documentation",
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
  apis: ["./routes/*.js", "./config/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;