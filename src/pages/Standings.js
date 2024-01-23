// frontend/src/pages/home.js
import React, { useState, useEffect } from 'react';

import StandingsTemplate from './templates/StandingsTemplate';

const Standings = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://nova-discs-fcf0d9c53d93.herokuapp.com/standings/`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <StandingsTemplate data={data} />
  );
};

export default Standings;
