import 'cross-fetch/polyfill'
import seedDatabase, { userOne, postOne, commentOne, commentTwo, userTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import { deleteComment, subscribeToComments, subscribeToPosts } from './utils/operations'

const client = getClient();

beforeEach(seedDatabase)

test('should delete own comment', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: commentTwo.comment.id
  }

  await client.mutate({ mutation: deleteComment, variables })
  const exists = await prisma.exists.Comment({ id: commentTwo.comment.id })

  expect(exists).toBe(false)
});

test('should not delete other users comment', async () => {
  const client = getClient(userTwo.jwt);
  const variables = {
    id: commentOne.comment.id
  }

  await expect(
    client.mutate({ mutation: deleteComment, variables })
  ).rejects.toThrow();
});

test('should subscribe to comments for a post', async (done) => {
  const client = getClient(userOne.jwt);

  const variables = {
    postId: postOne.post.id
  }

  client.subscribe({ query: subscribeToComments, variables }).subscribe({
    next(response) {
      expect(response.data.comment.mutation).toBe('DELETED')
      done()
    }
  })

  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } })
});

test('should subscribe to changes for published post', async (done) => {
  client.subscribe({ query: subscribeToPosts }).subscribe({
    next(response) {
      expect(response.data.post.mutation).toBe('DELETED')

      done()
    }
  })


  await prisma.mutation.deletePost({ where: { id: postOne.post.id } })
});