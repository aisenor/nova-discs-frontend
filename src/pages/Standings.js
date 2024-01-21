// frontend/src/pages/home.js
import React, { useState, useEffect } from 'react';

import StandingsTemplate from './templates/StandingsTemplate';

const Standings = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/standings/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <StandingsTemplate data={data} />
  );
};

export default Standings;
