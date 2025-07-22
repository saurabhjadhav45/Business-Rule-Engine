import Link from '@submodules/Link/Link';

import './index.scss';

function Footer() {
  return (
    <footer className='main-footer' data-testid='footer'>
      <div className='footer-container'>
        <div className='footer-content' data-testid='footer-content'>
          <span>{`Copyright © `}</span>
          <span>
            <strong>{new Date().getFullYear()}</strong>
          </span>
          <span>
            <Link href='http://perennialsys.com/'>{` Perennial Systems.`}</Link>
          </span>
          <span>{` All rights reserved. `}</span>
          <span className='privacy-feedback'>Privacy | Feedback</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
