import { gql } from "@apollo/client";

export const LIST_FILTERED_USERS = gql`
  query ListZellerCustomers($filter: TableZellerCustomerFilterInput, $limit: Int, $nextToken: String) {
    listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        role
      }
      nextToken
    }
  }
`;
