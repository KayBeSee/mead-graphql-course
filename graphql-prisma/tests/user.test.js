import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import bcrypt from 'bcryptjs'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();
  const firstUser = await prisma.mutation.createUser({
    data: {
      name: 'Jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('abcdef123')
    }
  });

  await prisma.mutation.createPost({
    data: {
      title: 'My first post',
      body: 'This is the body of the post',
      published: true,
      author: {
        connect: {
          id: firstUser.id
        }
      }
    }
  });

  await prisma.mutation.createPost({
    data: {
      title: 'My second post',
      body: 'This is the body of the post',
      published: false,
      author: {
        connect: {
          id: firstUser.id
        }
      }
    }
  });
});

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Kevin Mulcrone"
          email: "kevin@mulcrone.com",
          password: "mypassword123"
        }
      ) {
        token,
        user {
          id
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser
  });

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  })

  expect(exists).toBe(true)
});

test('Should expose public author profiles', async () => {
  const getUser = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `;

  const response = await client.query({ query: getUser })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Jen')
})

test('Should get all published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `;

  const response = await client.query({ query: getPosts })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].title).toBe('My first post')
})

test('should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login (
        data: {
          email: "jeff@example.com",
          password: "foobarjar123"
        }
      ) {
        token
      }
    }
  
  `;

  await expect(
    client.mutate({ mutation: login })
  ).rejects.toThrow()
})

test('should not throw with good login credentials', async () => {
  const login = gql`
    mutation {
      login (
        data: {
          email: "jen@example.com",
          password: "abcdef123"
        }
      ) {
        user {
          name
        }
      }
    }
  
  `;

  const response = await client.mutate({ mutation: login });
  console.log("response: ", response);
  expect(response.data.login.user.name).toBe('Jen')
})