import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('abcdef123')
  },
  user: undefined,
  jwt: undefined
}

const userTwo = {
  input: {
    name: 'Jeff',
    email: 'jeff@example.com',
    password: bcrypt.hashSync('PassForJeff')
  },
  user: undefined,
  jwt: undefined
}

const postOne = {
  input: {
    title: 'My first post',
    body: 'This is the body of the post',
    published: true
  },
  post: undefined
}

const postTwo = {
  input: {
    title: 'My second post',
    body: 'This is the body of the post',
    published: false
  },
  post: undefined
}

const commentOne = {
  input: {
    text: 'Great post! Thanks for sharing.'
  },
  comment: undefined
}

const commentTwo = {
  input: {
    text: 'Im glad you enjoyed it!'
  },
  comment: undefined
}

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  // create userOne
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_TOKEN_SECRET)

  // create userTwo
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });

  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_TOKEN_SECRET)

  // create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      },
      comments: []
    }
  });

  // create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      },
      comments: []
    }
  });

  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })
}

export { seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo }