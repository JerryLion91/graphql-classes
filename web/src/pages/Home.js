import React, { useState } from 'react';
import ClientEdit from '../components/ClientEdit';
import ClientList from '../components/ClientList';

export default function Home() {
  const [clientID, setClientID] = useState(null);

  return (
    <main>
      <ClientList onSelectClient={setClientID} />
      <ClientEdit clientID={clientID} />
    </main>
  );
}
