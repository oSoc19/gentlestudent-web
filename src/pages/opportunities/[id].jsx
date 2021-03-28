import { routes } from '../../constants';
import Router, { useRouter } from 'next/router';
import { Heading, Button, Icon } from '../../components/UI';
import { colors, spacers, breakpoints } from '../../assets/styles/constants';
import { Container } from '../../components/layout/index';
import { getOpportunities, getOpportunityById } from '../../api/opportunities';
import { getReadableDate } from '../../utils/index';

const Opportunity = ({ opportunity }) => {
  return (
    <>
      <Container>
        <div className="detail">
          <div className="detail__heading">
            <div>
              <Button
                href={routes.OPPORTUNITIES}
                text="Terug naar overzicht"
                icon="arrow-left"
                reverse
              />
              <Heading title={opportunity.title} level={1} />
            </div>
          </div>

          <div className="detail__description">
            <div>
              <Heading title="Beschrijving" level={2} />
              <p>
                De Gentse burgercoöperatie Energent organiseert met steun van Het Gents Milieufront
                (GMF), Natuurpunt Gent en Beweging.net een groepsaankoop van zonnepanelen: Gent
                Zonnestad. Zonnepanelen zijn vandaag een rendabele investering, ook nu er geen
                subsidies meer zijn. Voor ongeveer 4.000 euro heb je een installatie op je dak die
                je volledige jaarverbruik opwekt en die bovendien tot gemiddeld 8% financieel
                rendement oplevert... Dat is beter dan een spaarrekening! Leg zonnepanelen op je dak
                draag zo je steentje bij aan een klimaatneutrale stad!
              </p>
              <Heading title="Wat wordt er verwacht?" level={2} />
              <p>
                Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent,
                en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het
                presentatiemateriaal is reeds beschikbaar).
              </p>
              <Heading title="Meer weten?" level={2} />
              <Button text="Bekijk meer" icon="arrow-right" href={opportunity.moreInfo} />
              <div>
                <Button icon="arrow-right" text="Schrijf je in" type="button" primary />
              </div>
            </div>
          </div>

          <div className="detail__contact">
            <div>
              <Heading title="Info" level={2} />
              <div className="detail__info">
                <div className="info">
                  <p className="info__label">Organisatie</p>
                  <p>Hoger Technisch Instituut Sint-Antonius</p>
                </div>
                <div>
                  <p className="info__label">Website</p>
                  <p>{opportunity.website}</p>
                </div>
                <div>
                  <p className="info__label">Contact</p>
                  <p>{opportunity.contact}</p>
                </div>
                <div>
                  <p className="info__label">Locatie</p>
                  <p>Holstraat 66, 9000 Gent</p>
                </div>
                <div>
                  <p className="info__label">Periode</p>
                  <p>2019-12-02 tot en met 2025-06-30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Heading title="Inschrijvingen" level={1} marginTop />
        <Heading title="Nieuwe inschrijvingen" level={2} />
        <div className="participants">
          <div className="participants__participant">
            <p>02/03/2021</p>
            <div className="partcipant__img" />
            <p>John Doe</p>
            <p>john.doe@gmail.com</p>
            <p>Arteveldehogeschool</p>
            <div className="participant__buttons">
              <i>
                <Icon name="check" />
              </i>
              <i>
                <Icon name="times" />
              </i>
            </div>
          </div>
          <div className="participants__participant">
            <p>04/03/2021</p>
            <div className="partcipant__img" />
            <p>Jane Doe</p>
            <p>jane.doe@gmail.com</p>
            <p>Arteveldehogeschool</p>
            <div className="participant__buttons">
              <i>
                <Icon name="check" />
              </i>
              <i>
                <Icon name="times" />
              </i>
            </div>
          </div>
        </div>

        <Heading title="Voorbije inschrijvingen" level={2} marginTop />
      </Container>

      <style jsx>
        {`
          .participants__participant {
            display: grid;
            grid-template-columns: 10rem 4rem 2fr 3fr 1fr 1fr;
            grid-gap: 3rem;
            align-items: center;

            padding: 1.5rem 0;
            background-image: linear-gradient(90deg, #000 33%, hsla(0, 0%, 100%, 0) 0);
            background-position: 0 bottom;
            background-size: 3px 1px;
            background-repeat: repeat-x;
          }

          .participant__buttons > * {
            margin: 0 1rem;
          }

          .partcipant__img {
            border-radius: 50%;
            background: grey;
            width: 4rem;
            height: 4rem;
          }

          .detail {
            display: grid;
            grid-template: 1fr auto / repeat(2, 1fr);

            grid-template-areas:
              'heading info'
              'description info';
          }

          .detail__heading {
            grid-area: heading;
            padding-right: ${spacers.large};
            display: flex;
          }

          .detail__heading > div {
            margin-top: ${spacers.small};
          }

          .detail__description {
            grid-area: description;
            position: relative;
          }

          .detail__description > div {
            padding: ${spacers.large} ${spacers.large} ${spacers.large} 0;
          }

          .detail__description::before {
            background: ${colors.blueLight};
            content: '';
            position: absolute;
            height: 100%;
            width: calc(50vw + 10rem);
            z-index: -1;
            left: calc((100vw - 1300px) / -2);
          }

          .detail__contact > div {
            transform: translateY(60rem);
            padding-left: 18rem;
          }

          .detail__info div {
            display: flex;
          }

          .detail__info {
            margin-top: ${spacers.small};
            grid-area: info;
          }

          .info__label {
            width: 10rem;
            font-weight: bold;
          }

          .detail__info p {
            margin: 0.5rem;
          }

          .detail__heading::after {
            background: url('https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'),
              url('https://blog.top5gent.com/hs-fs/hubfs/Ghent-In-the-morning-streets-of-the-Ghent.-Ghent-is-a-city-and-a-municipality-in-the-Flemish-Region-of-Belgium..jpg?width=1000&name=Ghent-In-the-morning-streets-of-the-Ghent.-Ghent-is-a-city-and-a-municipality-in-the-Flemish-Region-of-Belgium..jpg');
            background-repeat: no-repeat;
            background-size: 12rem, cover;
            background-position: 2rem 0, center;
            content: '';
            position: absolute;
            height: 54rem;
            width: 50%;
            right: 0;
          }

          @media (max-width: ${breakpoints.large}) {
            .grid {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading info'
                'description info';
            }

            .detail__heading::after {
              width: 45%;
            }

            .detail__description::before {
              width: calc(60vw);
              left: -8rem;
            }

            .detail__contact > div {
              padding-left: 10rem;
            }
          }

          @media (max-width: 1400px) {
            .detail__description::before {
              left: -5rem;
            }
          }

          @media (max-width: ${breakpoints.medium}) {
            .grid {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading info'
                'description info';
            }

            .detail__description::before {
              width: 57vw;
            }

            .detail__heading::after {
              width: 46vw;
            }

            .detail__contact > div {
              padding-left: ${spacers.large};
            }
          }

          @media (max-width: 1080px) {
            .grid {
              grid-template: 1fr auto / 5fr 4fr;
              grid-template-areas:
                'heading heading'
                'description info';
            }

            .detail__heading {
              flex-direction: column;
              padding: 0;
            }

            .detail__heading::after {
              width: calc(100% + 5rem);
              position: inherit;
            }

            .detail__contact > div {
              transform: translateY(0);
              padding-top: ${spacers.large};
            }

            .detail__description::before {
              top: -${spacers.large};
              height: calc(100% + ${spacers.large});
            }

            .detail__info p {
              margin: 0;
            }

            .detail__info > div {
              flex-direction: column;
              margin-bottom: 1rem;
            }
          }

          @media (max-width: 900px) {
            .detail__heading::after {
              width: calc(100% + 6rem);
              transform: translateX(-${spacers.medium});
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .grid {
              grid-template: 1fr auto / 1fr;
              grid-template-areas:
                'heading'
                'description'
                'info';
            }

            .detail__heading::after {
              width: calc(100% + (${spacers.small} * 2));
              transform: translateX(-${spacers.small});
            }

            .detail__description > div {
              padding-right: 0;
            }

            .detail__description::before {
              width: calc(100% + (${spacers.small} * 2));
              left: -${spacers.small};
            }

            .detail__contact > div {
              padding: ${spacers.large} 0 0;
            }

            .detail__info > div {
              flex-direction: row;
            }
          }
        `}
      </style>
    </>
  );
};

export const getStaticPaths = async () => {
  // Same query as in opportunities/index.js, would be nice if this could be
  // called globally somewhere? Avoid duplicate calls
  const paths = (await getOpportunities()).map((opp) => ({ params: { id: opp.id } }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  // Will be a call for EVERY opportunity, better to store data somewhere
  // globally and filter with the id
  const opportunity = await getOpportunityById(params.id);
  opportunity.beginDate = getReadableDate(opportunity.beginDate);
  opportunity.endDate = getReadableDate(opportunity.endDate);

  return {
    props: { opportunity: { ...opportunity } }
    // revalidate: 900
  };
};

export default Opportunity;
