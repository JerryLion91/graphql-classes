import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const GET_CLIENT_LIST = gql`
  query GET_CLIENT_LIST($skip: Int, $take: Int) {
    clients(options: { skip: $skip, take: $take }) {
      itens {
        id
        name
        email
        disabled
      }
      totalItens
    }
  }
`;
const PAGE_SIZE = 10;

export default function ClientList({ onSelectClient }) {
  const { data, error, loading, fetchMore } = useQuery(GET_CLIENT_LIST, {
    fetchPolicy: 'cache-and-network',
    variables: {
      skip: 0,
      take: PAGE_SIZE,
    },
  });
  const clients = data?.clients.itens ?? [];

  const handleSelectClient = (client) => () => {
    onSelectClient?.(client.id);
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        skip: data.clients.itens.length,
        take: PAGE_SIZE,
      },
      updateQuery: (result, { fetchMoreResult }) => {
        if (!fetchMoreResult) return result;
        return {
          ...result,
          clients: {
            ...result.clients,
            itens: result.clients.itens.concat(fetchMoreResult.clients.itens),
            totalItens: fetchMoreResult.clients.totalItens,
          },
        };
      },
    });
  };

  if (error) {
    <section>
      <strong>Erro em buscar os clientes</strong>
    </section>;
  }
  if (loading && !data) {
    <section>
      <strong>Carregando...</strong>
    </section>;
  }

  return (
    <section>
      <ul>
        {clients.map((client) => {
          const { id, name, email } = client;
          return (
            <li key={id} onClick={handleSelectClient(client)}>
              <p>{name}</p>
              <p>{email}</p>
            </li>
          );
        })}
      </ul>
      <button disabled={loading} onClick={handleLoadMore}>
        Carregar mais
      </button>
    </section>
  );
}
