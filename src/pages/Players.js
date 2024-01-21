// frontend/src/pages/players.js
import React, { useState, useEffect } from 'react';

import PlayersTemplate from './templates/PlayersTemplate';

const Players = () => {
  const [data, setData] = useState({players: []});

  useEffect(() => {
    fetch('http://localhost:8000/players/')
      .then(response => response.json())
      .then(data => {
          console.log(data)
          setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <PlayersTemplate data={data} />
  );
};

export default Players;

