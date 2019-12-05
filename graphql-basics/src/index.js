import { GraphQLServer } from 'graphql-yoga';

// Scalar tyoes - String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: '1',
    name: 'Kevin',
    email: 'KayBeSee@gmail.com'
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
  },
  {
    id: '3',
    name: 'Mike',
    email: "Mike@example.com"
  }
];

const posts = [
  {
    id: '1',
    title: 'My First Post',
    body: 'This is my first post. Woot!',
    published: false,
    author: '1'
  },
  {
    id: '2',
    title: 'My Second Post',
    body: 'This is my second post. Woot!',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: 'My Third Post',
    body: 'This is my third post. Woot!',
    published: true,
    author: '2'
  },
  {
    id: '4',
    title: 'My Fourth Post',
    body: 'This is my fourth post. Woot!',
    published: true,
    author: '3'
  }
];

const comments = [
  {
    id: '1',
    text: 'My first comment',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'My second comment',
    author: '1',
    post: '2'
  },
  {
    id: '3',
    text: 'My third comment',
    author: '1',
    post: '3'
  },
  {
    id: '4',
    text: 'My fourth comment',
    author: '2',
    post: '3'
  },
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }


`;

// Resolvers

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    me() {
      return {
        id: 'abc123',
        name: 'Foo Bar',
        email: 'foo@bar.com',
        age: 12
      }
    },
    post() {
      return {
        id: 'abc123',
        title: 'My Title',
        body: 'My Body',
        published: true
      }
    },
    comments() {
      return comments
    }
  },
  Post: {
    author(parent, args, cxt, info) {
      return users.find((user) => {
        return user.id === parent.author;
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    }
  },
  User: {
    posts(parent, args, cxt, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!');
})