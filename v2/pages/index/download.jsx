import { colors } from '../../assets/styles/constants';

import mockup from '../../assets/img/home/download-mobile-app.png';
import android from '../../assets/img/home/android.png';
import ios from '../../assets/img/home/ios.png';

const Download = () => (
  <div className="download-container">
  <div className="download">
    <img src={mockup} alt="Gentlestudent app being used on a smartphone" />
    <div className="body">
      <h1>Download de mobile app</h1>
      <p>
        Om als student zicht te krijgen op waar de leerkansen zich in Gent situeren, kan je de
        Gentlestudent app downloaden. Deze app zal je melden wanneer je in de buurt bent van een
        leerkans. Via de app kan je ook het overzicht bewaren van de leerkansen waar je je voor hebt
        ingeschreven.
      </p>
      <div className="btn-group">
        <a
          href="https://apps.apple.com/be/app/gentlestudent/id1477161341"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ios} alt="iOS download button" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=gent.gentle.student"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={android} alt="Android download button" />
        </a>
      </div>
    </div>
  </div>
    <style jsx>
      {`
        .download-container {
          background ${colors.primary};
          display: flex;
          justify-content: center;
        }

        .download {
          display: flex;
          align-items: center;
          border-radius: 2rem 2rem 0 0;
          max-width: 100rem;
        }

        .download > img {
          position: relative;
          margin: -8rem 4rem 0 0;
          bottom: 0;
        }

        .body {
           margin-top: 4rem;
        }
     `}
    </style>
  </div>
);

export default Download;
