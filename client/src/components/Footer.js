import React from 'react';

const Footer = () =>
  // TODO: fix mobile
  (
    <div id="footer" className="bg-secondary">
      <div className="container">
        <div className="footer-block">
          <div className="row">
            <div className="col">
              <ul className="list-unstyled text-center text-md-left">
                <li className="list-item">
                   <p className="h3">Kontakt</p>
                 </li>
                <li className="list-item">Dojazd </li>
                <li className="list-item">Dane kontaktowe</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled text-center text-md-left">
                <li className="list-item">
                   <p className="h3">O nas</p>
                 </li>
                <li className="list-item">Historia</li>
                <li className="list-item">Nagrody</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled text-center text-md-left">
                <li className="list-item">
                   <p className="h3">Współpraca</p>
                 </li>
                <li className="list-item">Program partnerski</li>
                <li className="list-item">Katering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default Footer;
