import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            id
            name
            email
        }
    }
`

export const CREATE_USER = gql`
  mutation createUser($input: SignupInput) {
    createUser(input: $input) {
      token
    }
  }
`;
