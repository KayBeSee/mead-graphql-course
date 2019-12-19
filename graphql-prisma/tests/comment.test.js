import 'cross-fetch/polyfill'
import seedDatabase, { userOne, postOne, commentOne, commentTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import { deleteComment, subscribeToComments } from './utils/operations'

beforeEach(seedDatabase)

test('should delete own comment', async () => {
    const client = getClient(userOne.jwt);
    const variables = {
        id: commentTwo.comment.id
    }

    await client.mutate({ mutation: deleteComment, variables })
    const exists = await prisma.exists.Comment({id: commentTwo.comment.id})

    expect(exists).toBe(false)
});

test('should not delete other users comment', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
      id: commentOne.comment.id
  }

  expect(
    client.mutate({ mutation: deleteComment, variables })
  ).rejects.toThrow();
});

test('should subscribe to comments for a post', async () => {
  const variables = {
    postId: postOne.post.id
  }

  client.subscribe({ query: subscribeToComments, variables }).subscribe({
    next(response) {
      response.data.
    }
  })


  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } })
});