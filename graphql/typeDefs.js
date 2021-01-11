const { gql } = require('apollo-server');

module.exports = gql`
  type Product {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getProducts: [Product]
    getProduct(postId: ID!): Product
  }
  type Mutation {
    # User Mutation
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    # Product
    createProduct(body: String!): Product!
    deleteProduct(postId: ID!): String!
    createComment(postId: String!, body: String!): Product!
    deleteComment(postId: ID!, commentId: ID!): Product!
    likeProduct(postId: ID!): Product!
  }
  type Subscription {
    newProduct: Product!
  }
`;
