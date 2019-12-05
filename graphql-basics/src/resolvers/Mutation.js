import uuidv4 from 'uuid/v4';

export const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);
    if(emailTaken) {
      throw new Error(`Email ${args.email} is already taken`);
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = users.findIndex((user) => user.id === args.id);
    if(userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUsers = db.users.splice(userIndex, 1);
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if(match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
    });
    db.comments = db.comments.filter((comment) => comment.author !== args.data.author);

    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);
    if(!user) {
      throw new Error(`User ${id} not found`)
    }

    if(typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email)
      if(emailTaken) {
        throw new Error(`Email ${data.email} already taken`)
      }

      user.email = data.email;
    }

    if(typeof data.name === 'string') {
      user.name = data.name
    }

    if(typeof data.age !== undefined) {
      user.age = data.age
    }

    return user
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    if(!userExists) {
      throw new Error(`User ID ${args.data.author} not found`);
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }

    db.posts.push(post);

    if(args.data.published) {
      pubsub.publish('post', { 
        post: {
          mutation: 'CREATED',
          data: post
        } 
      })
    }

    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if(postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPosts = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    return deletedPosts[0];
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);
    if(!post) {
      throw new Error(`Post ${id} not found`)
    }

    if(typeof data.title === 'string') {
      post.title = data.title;
    }

    if(typeof data.body === 'string') {
      post.body = data.body;
    }

    if(typeof data.published === 'boolean') {
      post.published = data.published;
    }

    return post
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    if(!userExists) {
      throw new Error(`User ID ${args.data.author} not found`);
    }

    const post = db.posts.find((post) => post.id === args.data.post);
    if(!post) {
      throw new Error(`Post ID ${args.data.post} not found`);
    }

    if(!post.published) {
      throw new Error(`Post ID ${args.data.post} is not published yet!`);
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, { comment });

    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);
    if(commentIndex === -1) {
      throw new Error('Comment not found');
    }

    deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0]
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    if(!comment) {
      throw new Error(`Comment ${id} not found`)
    }

    if(typeof data.text === 'string') {
      comment.text = data.text
    }

    return comment;
  }
}