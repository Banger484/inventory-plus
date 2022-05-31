const { gql } = require('apollo-server-express');
const { GraphQLFloat } = require('graphql');


const typeDefs = gql`
type Enterprise {
  _id: ID!
  name: String!
  location: String!
  orderGuide:[Product]
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    credentials: String
    enterprise: Enterprise
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
    product: Product!
    orderNumber:Int
    saleNumber:Int
    cost:Float
    purchaseDate:String
    supplier:String
    receivedDate:String
    binLocation:String
    buyer:String
    salesPrice:Float
    saleDate:String
    fulfillmentDate:String
    enterprise:Enterprise
  }

  type Sale {
    product:String!
    quantity:Int!
    salesPrice:Float!
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
    getItemsByOrderNumber(orderNumber:Int!,enterpriseId:String!):[Item]
    getOrderedItems(enterpriseId:ID!):[Item]
    getCurrentStocks(enterpriseId:ID!):[Item]
    getOpenSales(enterpriseId:ID!):[Item]
    getFulfilledItems(enterpriseId:ID!):[Item]
    getOrderedItemsByProduct(enterpriseId:ID!, productId:ID!):[Item]
    getCurrentStocksByProduct(enterpriseId:ID!, productId:ID!):[Item]
    getOpenSalesByProduct(enterpriseId:ID!, productId:ID!):[Item]
    getFulfilledItemsByProduct(enterpriseId:ID!, productId:ID!):[Item]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addProduct(enterprise:ID!,sku: String!, name: String!, description: String!, msrp: Int!, category: String! notes: String!): Product
    updateProduct(_id: ID!, sku: String, name: String, description: String, msrp: Int, category: String notes: String): Product
    addEnterprise(name:String!,location:String!,userId:ID!): Enterprise
    addItems(quantity:Int!,productId:ID!,orderNumber:Int!,cost:Int!,purchaseDate:String!,supplier:String!,enterpriseId:ID!): [Item]
    updateItemReceived(item:ID!,receivedDate:String!,binLocation:String!): Item
    updateItemSale(item:ID!, saleDate:String!, buyer:String!): Item
    updateItemFulf(item:ID!, fulfillmentDate:String!):Item
    receiveOrder(enterpriseId:ID!,orderNumber:Int!,receivedDate:String!,binLocation:String!):[Item]
    makeSale(enterpriseId:ID!,saleId:Int!,buyer:String!,saleDate:String!,quantity:Int!,salesPrice:Float!,productId:ID!):[Item]
    fulfillSale(enterpriseId:ID!,saleNumber:Int!,fulfillmentDate:String!): [Item]
    register(name:String!,email:String!,password:String!,enterpriseName:String,location:String):User
    addToOrderGuide(enterpriseId:ID!,productId:ID!):Enterprise
    removeFromOrderGuide(enterpriseId:ID!,productId:ID!):Enterprise
  }


`
// makeSale(enterpriseId:ID!,saleId:Int!,buyer:String!,saleDate:String!,order:Sale):[Item]
module.exports = {typeDefs}


