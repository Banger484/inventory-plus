const { gql } = require('apollo-server-express');


const typeDefs = gql`
type Enterprise {
  _id: ID!
  name: String!
  location: String!
  registrant: User!
  users: [User]
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    credentials: String
    enterprise: ID
    role: String
  }

  type Product {
    _id: ID!
    sku: String!
    name: String!
    description: String!
    msrp: Float!
    category: String!
    notes: String!
  }

  type Item {
    _id: ID!
    product: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    allProducts: [Product]
    singleProduct(id:ID!): Product
    singleCategoryProducts(category: String!): [Product]
    getEnterprises: [Enterprise]
    getEnterpriseByUser(email:String!): Enterprise
    getItems: [Item]
    getItemsByOrderNumber(orderNumber:Int!):[Item]
    getOrderedItems(enterpriseId:ID!):[Item]
    getCurrentStocks(enterpriseId:ID!):[Item]
    getOpenSales(enterpriseId:ID!):[Item]
    getFulfilledItems(enterpriseId:ID!):[Item]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!,enterprise: String,role: String,credentials: String): Auth
    login(email: String!, password: String!): Auth
    addProduct(sku: String!, name: String!, description: String!, msrp: Int!, category: String! notes: String!): Product
    updateProduct(_id: ID!, sku: String, name: String, description: String, msrp: Int, category: String notes: String): Product
    addEnterprise(name:String!,location:String!,userId:ID!): Enterprise
    addItems(quantity:Int!,productId:ID!,orderNumber:Int!,cost:Int!,purchaseDate:String!,supplier:String!,enterpriseId:ID!): [Item]
    updateItemReceived(item:ID!,receivedDate:String!,binLocation:String!): Item
    updateItemSale(item:ID!, saleDate:String!, buyer:String!): Item
    updateItemFulf(item:ID!, fulfillmentDate:String!):Item
  }


`

module.exports = {typeDefs}


