import React from 'react';
import StampDescription from "./templates/StampDescription";
import StampOrderForm from "./templates/StampOrderForm";

const Stamps = () => {
  return (
      <div>
        <StampDescription/>
        <br/>
        <StampOrderForm/>
      </div>
  );
};

export default Stamps;