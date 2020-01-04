import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, login, getProfile, getUsers } from './utils/operations'

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: "Kevin Mulcrone",
      email: "kevin@mulcrone.com",
      password: "mypassword123"
    }
  }

  const response = await client.mutate({
    mutation: createUser,
    variables
  });

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  })

  expect(exists).toBe(true)
});

test('Should expose public author profiles', async () => {
  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Jen')
})

test('should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: "jen@example.com",
      password: "foobarjar123"
    }
  };

  await expect(
    client.mutate({ mutation: login, variables })
  ).rejects.toThrow()
})

test('should not throw with good login credentials', async () => {
  const variables = {
    data: {
      email: "jen@example.com",
      password: 'abcdef123'
    }
  }

  const response = await client.mutate({ mutation: login, variables });
  expect(response.data.login).toHaveProperty('token');
})

test('should fetch user profile', async () => {
  const client = getClient(userOne.jwt)

  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
});