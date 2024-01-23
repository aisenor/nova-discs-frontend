// frontend/src/pages/players.js
import React, { useState, useEffect } from 'react';

import PlayersTemplate from './templates/PlayersTemplate';

const Players = () => {
  const [data, setData] = useState({players: []});

  useEffect(() => {
    fetch(`https://nova-discs-fcf0d9c53d93.herokuapp.com/players/`)
      .then(response => response.json())
      .then(data => {
          setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <PlayersTemplate data={data} />
  );
};

export default Players;
