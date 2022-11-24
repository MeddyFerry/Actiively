import React from 'react';

import './burgerStyles.scss';

function Burger() {
  return (
    <div className="hamburger">
      <div className="burger burger1" />
      <div className="burger burger2" />
      <div className="burger burger3" />
    </div>
  );
}

export default React.memo(Burger);
