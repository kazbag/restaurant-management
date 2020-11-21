import React, { useContext } from "react";
import { withRouter } from "react-router";
import Countup from "react-countup";

const AboutPage = () => {
  return (
    <div className="row">
      <div className="d-flex flex-column col-12 col-md col-xl-8">
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              Istniejemy na rynku od ponad 20 lat. Gotowanie jest naszą pasją.
              Obsługujemy różne wydarzenia (wesela, chrzciny, komunie, stypy,
              catering), jedzenie z dostawą na terenie Krakowa. W roku 2018
              zostaliśmy wyróżnieni nagrodą Złotej Miski
            </p>
          </div>
        </div>
        <div className="card p-4 mt-4 bg-secondary text-light">
          <div className="row">
            <div className="col-6 col-md-3 d-flex flex-column justify-content-between">
              <p>Zadowolonych klientów</p>
              <div className="mb-4 mb-md-0">
                <Countup start={0} end={9213} duration={4.75} />
              </div>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column justify-content-between">
              <p>Złożonych zamówień</p>
              <div className="mb-4 mb-md-0">
                <Countup start={0} end={15733} duration={4.75} />
              </div>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column justify-content-between">
              <p>Przejechanych kilometrów</p>
              <div className="mb-4 mb-md-0">
                <Countup start={0} end={29214} duration={4.75} />
              </div>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column justify-content-between">
              <p>Dni na rynku</p>
              <div className="mb-4 mb-md-0">
                <Countup start={0} end={932} duration={4.75} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md mt-4 mt-md-0">
        <div className="mx-auto d-flex align-items-center justify-content-center">
          <img
            className="img-fluid"
            src="https://dziendobry.tvn.pl/media/cache/content/kucharz-i-obsluga-restauracji-jpg.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(AboutPage);
