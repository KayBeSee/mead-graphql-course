import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

export default prisma;

// prisma.query.users(null, '{ id name email }').then((data) => {
//   console.log('users: ', JSON.stringify(data, undefined, 2));
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//   console.log('comments: ', JSON.stringify(data, undefined, 2))
// });

// prisma.mutation.createPost({
//   data: {
//     title: "My new graphql post is live!",
//     body: "You can blah blah blah",
//     published: true,
//     author: {
//       connect: {
//         id: "ck3xj7wkx02gn0962ycjhoqyg"
//       }
//     }
//   }
// }, '{ id title body published }').then((data) => {
//   console.log('data: ', data);
// })

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//   if (!userExists) {
//     throw new Error(`User not found`);
//   }

//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ author { id name email posts { id title published } } }');

//   return post.author;
// }

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: authpostIdorId });
//   if (!postExists) {
//     throw new Error(`Post not found`);
//   }

//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data
//   }, '{ author { id name email posts { id title published } } }')

//   return post.author;
// }