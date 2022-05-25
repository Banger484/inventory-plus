import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($name: String!, $email: String!, $password: String!, $enterprise: String!) {
    addUser(name: $name, email: $email, password: $password, enterprise: $enterprise) {
      token
      user {
        _id
        email
        name
        password
        credentials
        enterprise
      }
    }
  }
`;


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
        enterprise
      }
    }
  }
`;
