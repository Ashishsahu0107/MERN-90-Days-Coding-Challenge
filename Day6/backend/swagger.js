import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert backslashes to forward slashes for Windows compatibility in glob patterns
const routesGlob = path.join(__dirname, "routes", "*.js").replace(/\\/g, "/");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant API",
      version: "1.0.0",
      description: "Restaurant Management System API",
    },
    servers: [
      {
        url: "http://localhost:4500",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The user ID",
              example: 1,
            },
            name: {
              type: "string",
              description: "The user's name",
              example: "Ashish",
            },
            email: {
              type: "string",
              description: "The user's email",
              example: "ashish@gmail.com",
            },
          },
        },
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Ashish",
            },
            email: {
              type: "string",
              example: "ashish@gmail.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "ashish@gmail.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },
      },
    },
  },

  apis: [routesGlob],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;