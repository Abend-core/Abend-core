import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Abnd.io",
            version: "1.0.0",
            description: "Documentation de l'API Abnd.io",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Abnd.io",
            },
        ],
    },
    apis: ["src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
