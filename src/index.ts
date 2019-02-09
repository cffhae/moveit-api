import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";

import { SiteResolver } from "./modules/site.resolver";
import { StatusCodeResolver } from "./modules/statusCode.resolver";
import { UserResolver } from "./modules/user.resolver";

const main = async () => {
  await createConnection();

  const app = express();

  const schema = await buildSchema({
    resolvers: [SiteResolver, StatusCodeResolver, UserResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log(`Express Server Running on http://localhost:3000/graphql`);
  });
};

useContainer(Container);
main();
