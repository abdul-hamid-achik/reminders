import { withSwagger } from "next-swagger-doc";

const swaggerHandler = withSwagger({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Remindly API Docs",
      version: "0.1.0",
    },
  },
  apis: ["./src/pages/api/**/*.ts"],
});
export default swaggerHandler();
