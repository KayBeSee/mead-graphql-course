export const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.Subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    }
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.Subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info);
    }
  }
}