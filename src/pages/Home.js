import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState({});

    useEffect(() => {
      fetch('https://nova-discs-fcf0d9c53d93.herokuapp.com')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
};

export default Home;