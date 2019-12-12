export const Query = {
  users(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          { name_contains: args.query },
          { email_contains: args.query }
        ]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { db, prisma }, info) {
    if (args.query) {
      opArgs.where = {
        OR: [
          { title_contains: args.query },
          { body_contains: args.query }
        ]
      }
    }

    return prisma.query.posts(opArgs, info)
  },
  comments(parent, args, { db }, info) {
    return db.comments
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
};