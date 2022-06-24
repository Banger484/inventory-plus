import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation register($name: String!, $email: String!, $password: String!, $enterpriseName: String, $location: String) {
  register(name: $name, email: $email, password: $password, enterpriseName: $enterpriseName, location: $location) {
    _id
    name
    email
    password
    credentials
    enterprise {
      _id
      name
      location
    }
    role
  }
}
`;

export const REMOVE_USER = gql`
mutation removeUser($userId: ID!) {
  removeUser(userId: $userId) {
    _id
    name
    email
    password
    credentials
    role
  }
}
`
export const TOGGLE_USER = gql`
mutation Mutation($toggleUserId: ID!) {
  toggleUser(id: $toggleUserId)
}
`

export const ADD_USER_TO_EXISTING = gql`
mutation addUserToExisting($name: String!, $email: String!, $password: String!, $enterprise: ID!) {
  registerOnlyUser(name: $name, email: $email, password: $password, enterprise: $enterprise) {
    _id
    name
    email
    password
    credentials
    enterprise {
      _id
      name
      location
    }
    role
  }
}
`

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      name
      email
      password
      credentials
      enterprise{
        _id
        name
        location
      }
    }
  }
}
`;

export const ADD_PRODUCT = gql`
mutation Mutation($enterprise: ID!, $sku: String!, $name: String!, $description: String!, $msrp: Float!, $category: String!, $notes: String!, $imageKey: String) {
  addProduct(enterprise: $enterprise, sku: $sku, name: $name, description: $description, msrp: $msrp, category: $category, notes: $notes, imageKey: $imageKey) {
    _id
    sku
    name
    description
    msrp
    category
    notes
    disabled
  }
}
`

export const UPDATE_PRODUCT_NAME = gql`
mutation updateName($id: ID!, $name: String) {
  updateProduct(_id: $id, name: $name) {
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
export const UPDATE_PRODUCT_SKU = gql`
mutation updateProductSku($id: ID!, $sku: String) {
  updateProduct(_id: $id, sku: $sku) {
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

export const UPDATE_PRODUCT_DESCRIPTION = gql`
mutation UpdateProductDescription($id: ID!, $description: String) {
  updateProduct(_id: $id, description: $description) {
    _id
    description
  }
}
`

export const UPDATE_PRODUCT_MSRP = gql`
mutation updateProductMSRP($id: ID!, $msrp: Int) {
  updateProduct(_id: $id, msrp: $msrp) {
    msrp
    _id
  }
}
`
export const UPDATE_PRODUCT_CATEGORY = gql`
mutation updateProductCategory($id: ID!, $category: String) {
  updateProduct(_id: $id, category: $category) {
    _id
    category
  }
}`

export const UPDATE_PRODUCT_NOTES = gql`
mutation updateProductNotes($id: ID!, $notes: String) {
  updateProduct(_id: $id, notes: $notes) {
    _id
    notes
  }
}
`

export const TOGGLE_PRODUCT = gql`
mutation ToggleProduct($toggleProductId: ID!) {
  toggleProduct(id: $toggleProductId)
}
`

export const ADD_ENTERPRISE = gql`
mutation addEnterprise($name: String!, $userId: ID!, $location: String!) {
  addEnterprise(name: $name, userId: $userId, location: $location) {
    _id
    name
    location
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

export const BUY_ITEMS = gql`
mutation Mutation($quantity: Int!, $productId: ID!, $orderNumber: Int!, $cost: Float!, $purchaseDate: String!, $supplier: String!, $enterpriseId: ID!) {
  addItems(quantity: $quantity, productId: $productId, orderNumber: $orderNumber, cost: $cost, purchaseDate: $purchaseDate, supplier: $supplier, enterpriseId: $enterpriseId) {
    _id
  }
}
`
export const RECEIVE_ITEMS = gql`
mutation Mutation($enterpriseId: ID!, $orderNumber: Int!, $receivedDate: String!, $binLocation: String!) {
  receiveOrder(enterpriseId: $enterpriseId, orderNumber: $orderNumber, receivedDate: $receivedDate, binLocation: $binLocation) {
    _id
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
export const SELL_ITEMS = gql`
mutation sellItems($enterpriseId: ID!, $saleId: Int!, $buyer: String!, $saleDate: String!, $quantity: Int!, $salesPrice: Float!, $productId: ID!) {
  makeSale(enterpriseId: $enterpriseId, saleId: $saleId, buyer: $buyer, saleDate: $saleDate, quantity: $quantity, salesPrice: $salesPrice, productId: $productId) {
    _id
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

export const FULFILL_ITEMS = gql`
mutation Mutation($enterpriseId: ID!, $saleNumber: Int!, $fulfillmentDate: String!) {
  fulfillSale(enterpriseId: $enterpriseId, saleNumber: $saleNumber, fulfillmentDate: $fulfillmentDate) {
    _id
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
export const ADD_TO_ORDERGUIDE = gql`
mutation ADD_TO_ORDERGUIDE($enterpriseId: ID!, $productId: ID!) {
  addToOrderGuide(enterpriseId: $enterpriseId, productId: $productId) {
    _id
    name
    location
    orderGuide {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
  }
}`
export const REMOVE_FROM_ORDERGUIDE = gql`
mutation RemoveFromOrderGuide($enterpriseId: ID!, $productId: ID!) {
  removeFromOrderGuide(enterpriseId: $enterpriseId, productId: $productId) {
    _id
    name
    location
    orderGuide {
      _id
      sku
      name
      description
      msrp
      category
      notes
    }
  }
}`
export const SET_STOCK_GUIDE = gql`
mutation Mutation($enterpriseId: ID!, $product: ID!, $requiredStock: Int!) {
  setStockGuide(
    enterpriseId: $enterpriseId
    product: $product
    requiredStock: $requiredStock
  )
}
`;
