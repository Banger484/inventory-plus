import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query allUsers {
    users {
      _id
      name
      email
      password
      credentials
      enterprise
    }
  }
`;

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
query QueryAllProducts {
  allProducts {
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

const QUERY_ALL_ENTERPRISES = gql`
query Query {
  getEnterprises {
    name
    location
  }
}
`

const QUERY_SINGLE_ENTERPRISE = gql`
query Query($email: String!) {
  getEnterpriseByUser(email: $email) {
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

const QUERY_ITEMS_BY_ORDER_NUMBER = gql`
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

const 

