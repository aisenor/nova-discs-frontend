// frontend/src/pages/home.js
import React, { useState } from 'react';
import ScorecardTemplate from "./templates/ScorecardTemplate";

const Scorecard = () => {
  const [data] = useState({});

  return (
    <ScorecardTemplate data={data} />
  );
};

export default Scorecard;