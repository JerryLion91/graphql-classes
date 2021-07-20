import gql from 'graphql-tag';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';

const CLIENT = gql`
  query CLIENT($clientID: ID!) {
    client(id: $clientID) {
      id
      name
      email
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UPDATE_CLIENT($id: ID!, $name: String!, $email: String!) {
    updateClient(input: { id: $id, name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

export default function ClientEdit({ clientID }) {
  const { data } = useQuery(CLIENT, {
    variables: {
      clientID,
    },
    skip: !clientID,
    fetchPolicy: 'cache-first',
  });

  const [ updateClient ] = useMutation(UPDATE_CLIENT);

  const initialValues = useMemo(
    () => ({
      name: data?.client.name ?? '',
      email: data?.client.email ?? '',
    }),
    [data]
  );

  const [values, setValues] = useState(initialValues);
  useEffect(() => setValues(initialValues), [initialValues]);

  const handleNameChange = ({ target: { value } = {} }) =>
    setValues((values) => ({ ...values, name: value }));
  const handleEmailChange = ({ target: { value } = {} }) =>
    setValues((values) => ({ ...values, email: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClient({
      variables: {
        id: clientID,
        name: values.name,
        email: values.email,
      },
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <input type="text" value={values.name} onChange={handleNameChange} />
      </fieldset>
      <fieldset>
        <input type="text" value={values.email} onChange={handleEmailChange} />
      </fieldset>
      <button type="submit">Salvar</button>
    </form>
  );
}
