require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./data/typeDef");
const resolvers = require("./data/resolvers");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { createServer } = require("http");
const { graphqlUploadExpress } = require("graphql-upload");
const path = require("path");

async function startServer() {
  const app = express();

  app.use(express.static(path.join(__dirname, "files")));

  app.use(graphqlUploadExpress());

  const httpServer = createServer(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
  // start the Express server
  httpServer.listen(process.env.PORT, () => {
    console.log(
      `server started at http://localhost:${process.env.PORT}/graphql`
    );
  });
}

startServer();
