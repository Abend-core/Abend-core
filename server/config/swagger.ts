import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mon API Express",
            version: "1.0.0",
            description: "Documentation de l'API Abnd.io",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description:
                    "Serveur de Abnd.io, lien du site : https://Abnd.io",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
