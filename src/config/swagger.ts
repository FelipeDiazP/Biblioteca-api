import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST para una Biblioteca",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://biblioteca-api-2c0w.onrender.com/",
        description: "Servidor Produccion",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },

  apis: ["./src/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
