// frontend/src/pages/my_scores.js
import React, { useState, useEffect } from 'react';

import MyScoresTemplate from './templates/MyScoresTemplate';

const MyScores = () => {
  const [data, setData] = useState({players: []});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/my_scores/`)
      .then(response => response.json())
      .then(data => {
          setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <MyScoresTemplate data={data} />
  );
};

export default MyScores;
