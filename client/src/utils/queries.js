import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query GetAllUsers {
  getAllUsers {
    _id
    name
    email
    password
    credentials
    role
    disabled
    enterprise {
      _id
      name
      location
    }
  }
}
`;

export const QUERY_ENT_USERS=gql`
query Query($enterpriseId: ID!) {
  getEnterpriseUsers(enterpriseId: $enterpriseId) {
    _id
    name
    email
    password
    credentials
    role
  }
}
`

export const QUERY_SINGLE_USER = gql`
query getUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      email
      password
      credentials
      enterprise
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
query Query($all: Boolean) {
  allProducts(all: $all) {
    _id
    sku
    name
    description
    msrp
    category
    notes
    disabled
    imageKey
  }
}
`

export const QUERY_SINGLE_PRODUCT = gql`
query Query($singleProductId: ID!) {
  singleProduct(id: $singleProductId) {
    _id
    sku
    name
    description
    msrp
    category
    notes
  }
}
`
export const QUERY_SINGLE_CATEGORY = gql`
query Query($category: String!) {
  singleCategoryProducts(category: $category) {
    _id
    sku
    name
    description
    msrp
    category
    notes
  }
}
`

export const QUERY_ALL_ENTERPRISES = gql`
query Query {
  getEnterprises {
    name
    location
  }
}
`

export const QUERY_SINGLE_ENTERPRISE = gql`
query Query($email: String!) {
  getEnterpriseByUser(email: $email) {
    _id
    name
    location
    orderGuide
    registrant {
      _id
      name
      email
      password
      credentials
      enterprise
      role
    }
  }
}
`
export const GET_ENTERPRISE_BY_ID = gql`
query GetEnterpriseById($id: ID!) {
  getEnterpriseById(_id: $id) {
    _id
    name
    location
    orderNumber
    saleNumber
    orderGuide {
      _id
      sku
      name
      description
      msrp
      category
      notes
      imageKey
    }
  }
}
`
export const QUERY_ITEMS_BY_ORDER_NUMBER = gql`
query Query($orderNumber: Int!, $enterpriseId: String!) {
  getItemsByOrderNumber(orderNumber: $orderNumber, enterpriseId: $enterpriseId) {
    _id
    product {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
    orderNumber
    saleNumber
    cost
    purchaseDate
    supplier
    receivedDate
    binLocation
    buyer
    salesPrice
    saleDate
    fulfillmentDate
    enterprise {
      location
      name
      _id
    }
  }
}
`

export const GET_CURRENT_STOCKS = gql`
query Query($enterpriseId: ID!) {
  getCurrentStocks(enterpriseId: $enterpriseId) {
    _id
    product {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
    orderNumber
    cost
    purchaseDate
    supplier
    receivedDate
    binLocation
  }
}
`
export const PRODUCT_ANALYSIS = gql`
query generateProductReport($enterpriseId: ID!, $productId:ID!){
  generateProductReport(enterpriseId: $enterpriseId, productId: $productId){
    name
    description
    msrp
    category
    notes
    numberPurchased 
    numberIncoming
    numberInStock
    numberOutgoing
    numberFulfilled
    numberSold
    totalSalesRevenue
    averageSalesPrice
    totalCost
    averageCost

  }
}
`


export const GET_INCOMING_ITEMS = gql`
query GetIncomingItems($enterpriseId: ID!) {
  getOrderedItems(enterpriseId: $enterpriseId) {
    _id
    product {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
    orderNumber
    saleNumber
    cost
    purchaseDate
    supplier
    receivedDate
    binLocation
    buyer
    salesPrice
    saleDate
    fulfillmentDate
  }
}
`

export const GET_OPEN_SALES =gql`
query getOpenSales($enterpriseId: ID!) {
  getOpenSales(enterpriseId: $enterpriseId) {
    _id
    product {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
    orderNumber
    saleNumber
    cost
    purchaseDate
    supplier
    receivedDate
    binLocation
    buyer
    salesPrice
    saleDate
    fulfillmentDate
  }
}`

export const GET_SALES = gql `
query Query($enterpriseID: ID!) {
  getCompletedSales (enterpriseId: $enterpriseId) {
    _id
    product {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
    saleNumber
    cost
    purchaseDate
    binLocation
    buyer
    saleDate
    salesPrice
    fulfillmentDate
  }
}`

export const GET_INVENTORY = gql `
query Query($enterpriseID: ID!) {
  getInventory (enterpriseId: $enterpriseId) {
    _id
    product {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
    cost
    purchaseDate
    binLocation
    receivedDate
    supplier
  }
}`

export const QUERY_ORDER_DETAILS = gql`
query OrderDetails($enterpriseId: ID!, $orderNumber: Int!) {
  orderDetails(enterpriseId: $enterpriseId, orderNumber: $orderNumber) {
    productName
    units
    sku
    binLocation
    totalCost
    costPerUnit
    totalSales
    salePerUnit
  }
}
` 

export const GET_MONTH_TO_MONTH = gql`
query GroupItemsByMonth($enterpriseId: ID!, $productId: ID) {
  groupItemsByMonth(enterpriseId: $enterpriseId, productId: $productId) {
    month
    year
    numberPurchased
    numberSold
    totalIncome
    totalCost
  }
}`
export const GET_STOCK_GUIDE = gql`
query Query($enterpriseId: ID!) {
  getStockGuide(enterpriseId: $enterpriseId) {
    product
    requiredStock
  }
}
`;

export const CURRENT_STOCK_QUANTITIES = gql`
query CurrentStocksQuantity($enterpriseId: ID!) {
  currentStocksQuantity(enterpriseId: $enterpriseId) {
    product
    quantity
  }
}
`

export const PAST_SALES_QUANTITIES = gql`
query CurrentStocksQuantity($enterpriseId: ID!) {
  pastSalesQuantity(enterpriseId: $enterpriseId) {
    product
    quantity
  }
}
`

export const ALL_PURCHASES = gql`
query AllPastPurchases($enterpriseId: ID!) {
  allPastPurchases(enterpriseId: $enterpriseId) {
    product
    quantity
  }
}
`

export const PAST_SUPPLIERS = gql`
query PastSuppliers($enterpriseId: ID!, $productId: ID!) {
  pastSuppliers(enterpriseId: $enterpriseId, productId: $productId) {
    supplier
    quantity
  }
}
`

export const PAST_BUYERS = gql`
query PastBuyers($enterpriseId: ID!, $productId: ID!) {
  pastBuyers(enterpriseId: $enterpriseId, productId: $productId) {
    buyer
    quantity
  }
}
`