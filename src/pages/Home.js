import React from 'react';
import StampDescription from "./templates/StampDescription";
import StampOrderForm from "./templates/StampOrderForm";

const Home = () => {
  return (
      <div>
        <StampDescription/>
        <br/>
        <StampOrderForm/>
      </div>
  );
};

export default Home;