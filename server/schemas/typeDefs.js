const { gql } = require('apollo-server-express');
const { GraphQLFloat } = require('graphql');


const typeDefs = gql`

input ProductOrder {
  cost:Float!
  quantity:Int!
  product:ID!
}

type Enterprise {
  _id: ID!
  name: String!
  location: String!
  orderGuide:[Product]
  orderNumber:Int
  saleNumber:Int
}

type Analysis {
  name:String!
  description:String!
  msrp:Float!
  category:String!
  notes:String!
  numberPurchased:Int
  numberIncoming:Int
  numberInStock:Int
  numberOutgoing:Int
  numberFulfilled:Int
  numberSold:Int
  totalSalesRevenue:Float
  averageSalesPrice:Float
  totalCost:Float
  averageCost:Float
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    credentials: String
    enterprise: Enterprise
    role: String
    disabled: Boolean
    avatar: String
  }

  type Product {
    _id: ID!
    sku: String!
    name: String!
    description: String!
    msrp: Float!
    category: String!
    notes: String!
    disabled: Boolean
    imageKey:String
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

  type ProductRow {
    productName:String
    units:Int
    sku:String
    binLocation:String
    totalCost:Float
    costPerUnit:Float
    totalSales:Float
    salePerUnit:Float
  }

  type StockGuide {
    product:ID!
    requiredStock:Int!
  }

  type Month {
    month: Int
    year: Int
    numberPurchased: Int
    numberSold: Int
    totalCost:Float
    totalIncome:Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type StockQuantity {
    product:String
    quantity:Int
  }

  type Supplier {
    supplier:String
    quantity:Int
  }
  type Buyer {
    buyer:String
    quantity:Int
  }

  type AverageRow {
    period:String
    numberPurchased:Int
    numberSold:Int
    totalCost:Int
    totalIncome:Int
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    allProducts(all: Boolean): [Product]
    singleProduct(id:ID!): Product
    singleCategoryProducts(category: String!): [Product]
    getEnterprises: [Enterprise]
    getEnterpriseByUser(email:String!): Enterprise
    getEnterpriseById(_id:ID!): Enterprise
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
    getEnterpriseUsers(enterpriseId:ID!):[User]
    getCompletedSales(enterpriseId:ID!):[Item]
    getInventory(enterpriseId:ID!):[Item]
    generateProductReport(enterpriseId:ID!, productId:ID!):Analysis
    orderDetails(enterpriseId: ID!,orderNumber: Int!):[ProductRow]
    getStockGuide(enterpriseId:ID!):[StockGuide]
    groupItemsByMonth(enterpriseId:ID!,productId:ID):[Month]
    getAllUsers:[User]
    currentStocksQuantity(enterpriseId:ID!):[StockQuantity]
    pastSalesQuantity(enterpriseId:ID!):[StockQuantity]
    allPastPurchases(enterpriseId:ID!):[StockQuantity]
    pastSuppliers(enterpriseId:ID!,productId:ID!):[Supplier]
    pastBuyers(enterpriseId:ID!,productId:ID!):[Buyer]
    productAverages(enterpriseId:ID!,productId:ID!):[AverageRow]
    getTheme(userId:ID!):String
    getAvatar(userId:ID!):String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addProduct(enterprise:ID!,sku: String!, name: String!, description: String!, msrp: Float!, category: String! notes: String!,imageKey: String): Product
    updateProduct(_id: ID!, sku: String, name: String, description: String, msrp: Int, category: String notes: String): Product
    addEnterprise(name:String!,location:String!,userId:ID!): Enterprise
    addItems(quantity:Int!,productId:ID!,orderNumber:Int!,cost:Float!,purchaseDate:String!,supplier:String!,enterpriseId:ID!): [Item]
    updateItemReceived(item:ID!,receivedDate:String!,binLocation:String!): Item
    updateItemSale(item:ID!, saleDate:String!, buyer:String!): Item
    updateItemFulf(item:ID!, fulfillmentDate:String!):Item
    receiveOrder(enterpriseId:ID!,orderNumber:Int!,receivedDate:String!,binLocation:String!):[Item]
    makeSale(enterpriseId:ID!,saleId:Int!,buyer:String!,saleDate:String!,quantity:Int!,salesPrice:Float!,productId:ID!):[Item]
    fulfillSale(enterpriseId:ID!,saleNumber:Int!,fulfillmentDate:String!): [Item]
    register(name:String!,email:String!,password:String!,enterpriseName:String,location:String):User
    registerOnlyUser(name:String!,email:String!,password:String!,enterprise:ID!):User
    addToOrderGuide(enterpriseId:ID!,productId:ID!):Enterprise
    removeFromOrderGuide(enterpriseId:ID!,productId:ID!):Enterprise
    removeUser(userId:ID!):User
    setStockGuide(enterpriseId:ID!,product:ID!,requiredStock:Int!):String!
    purchaseProducts(orderNumber:Int!,enterpriseId:ID!,purchaseDate:String!,supplier:String!,products:[ProductOrder]):String
    toggleUser(id:ID!):String
    toggleProduct(id:ID!):String
    setTheme(userId:ID!,theme:String):String
    setAvatar(userId:ID!,avatar:String):String
  }


`

module.exports = {typeDefs}


