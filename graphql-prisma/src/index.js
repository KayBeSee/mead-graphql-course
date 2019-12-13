import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { Query, Mutation, Subscription, Post, Comment, User } from './resolvers'
import prisma from './prisma'

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
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    }
  }
});

server.start(() => {
  console.log('The server is up!');
})