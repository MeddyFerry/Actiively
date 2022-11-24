import React from 'react';

import './footerStyles.scss';

function Footer() {
  return (
    <footer className="footer">
      <h1 className="footer-title">Copyright 2022</h1>
    </footer>
  );
}

export default React.memo(Footer);
