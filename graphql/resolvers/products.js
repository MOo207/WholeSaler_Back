const { AuthenticationError, UserInputError } = require('apollo-server');

const Product = require('../../models/Product');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getProducts() {
      try {
        const products = await Product.find().sort({ createdAt: -1 });
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProduct(_, { productId }) {
      try {
        const product = await Product.findById(productId);
        if (product) {
          return product;
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createProduct(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new Error('Product body must not be empty');
      }

      const newProduct = new Product({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const product = await newProduct.save();

      context.pubsub.publish('NEW_POST', {
        newProduct: product
      });

      return product;
    },
    async deleteProduct(_, { productId }, context) {
      const user = checkAuth(context);

      try {
        const product = await Product.findById(productId);
        if (user.username === product.username) {
          await product.delete();
          return 'Product deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likeProduct(_, { productId }, context) {
      const { username } = checkAuth(context);

      const product = await Product.findById(productId);
      if (product) {
        if (product.likes.find((like) => like.username === username)) {
          // Product already likes, unlike it
          product.likes = product.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like product
          product.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await product.save();
        return product;
      } else throw new UserInputError('Product not found');
    }
  },
  Subscription: {
    newProduct: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};
