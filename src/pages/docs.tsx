import { type GetStaticProps, type InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{
  spec: any;
  // @ts-ignore
}>(import("swagger-ui-react"), { ssr: false });

function Docs({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Remindly API Docs",
        version: "1.0",
      },
    },
    apis: ["./src/pages/api/**/*.ts"],
  });

  return {
    props: {
      spec,
    },
  };
};

export default Docs;
