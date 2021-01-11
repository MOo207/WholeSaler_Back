const productsResolvers = require('./products');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  Product: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...productsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...productsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...productsResolvers.Subscription
  }
};
