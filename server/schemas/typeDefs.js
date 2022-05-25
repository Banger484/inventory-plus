const { gql } = require('apollo-server-express');


const typeDefs = gql`
type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    credentials: String!
    enterprise: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!,enterprise: String!): Auth
    login(email: String!, password: String!): Auth
  }


`

module.exports = {typeDefs}


