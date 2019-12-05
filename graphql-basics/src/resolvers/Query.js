export const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
      const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
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