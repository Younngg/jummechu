'use client';

import { useEffect, useState } from 'react';

const PartyList = () => {
  const [parties, setParties] = useState();

  useEffect(() => {
    fetch('/api/party', {
      method: 'GET',
    }).then((res) => res.json()).then(data => console.log(data));
  }, []);

  return (
    <section>
      <ul>
        <li></li>
      </ul>
    </section>
  );
};

export default PartyList;
