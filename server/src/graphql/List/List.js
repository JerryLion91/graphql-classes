import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  interface List {
    itens: [Node!]!
    totalItens: Int!
  }

  enum ListSortmentEnum {
    ASC
    DSC
  }

  input ListSort {
    sorter: String!
    sortment: ListSortmentEnum!
  }
`;

export const ListSortmentEnum = Object.freeze({
  ASC: 'ASC',
  DSC: 'DSC',
});

export const resolvers = {
  List: {
    __resolveType: () => null,
  },
};
