import React from 'react';
import ImageNotFound from '../../images/ErrorPage.svg';

import './notFoundStyles.scss';

function NotFound() {
  return (
    <div>
      <img src={ImageNotFound} alt="Page non trouvée" className="notFound_image" />
      <a href="https://storyset.com/web" className="attribution">Web illustrations by Storyset</a>
    </div>
  );
}

export default React.memo(NotFound);
