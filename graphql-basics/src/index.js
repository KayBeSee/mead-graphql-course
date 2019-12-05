import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { Query, Mutation, Subscription, Post, Comment, User } from './resolvers'

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Post,
    Comment,
    User
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log('The server is up!');
})