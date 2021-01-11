require("dotenv").config();
const {ApolloServer, PubSub} = require("apollo-server");
const mongoose = require("mongoose");
const { MONGO } = require("./config.js");
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();
const port = process.env.PORT || 4040;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGO, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Atlas Cluster is Connected');
    return server.listen({ port: port });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
