// frontend/src/pages/home.js
import React, { useState, useEffect } from 'react';
import ScorecardTemplate from "./templates/ScorecardTemplate";

const Scorecard = () => {
  const [data, setData] = useState({});

  return (
    <ScorecardTemplate data={data} />
  );
};

export default Scorecard;