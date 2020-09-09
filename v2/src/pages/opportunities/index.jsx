import Router from 'next/router';
import Link from 'next/link';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../api/firebase';
import { routes } from '../../constants';
import { Card, Heading, Search, SearchBackup } from '../../components/UI';
import { spacers, colors } from '../../assets/styles/constants';

export default () => {
  /*
   * TODO: Only fetch opportunities of specific issuer
   */

  const [value, loading, error] = useCollectionOnce(firestore.collection('Opportunities'));

  const OPPORTUNITIES = [
    {
      title: 'Gent Zonnestad: presenteer op een infoavond',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    }
  ];

  return (
    <>
      <Link href={routes.issuer.CREATE_OPPORTUNITY}>Create new opportunity</Link>
      {/* value &&
        value.docs.map((doc) => {
          const { title } = doc.data();
          const { id } = doc;
          return (
            !loading && (
              <button
                className="button-container"
                type="button"
                key={id}
                onClick={() =>
                  Router.push(routes.issuer.OPPORTUNITY, `${routes.issuer.OPPORTUNITIES}/${id}`)
                }
              >
                {title}
              </button>
            )
          );
        }) */}

      <div className="container">
        <Heading title="Leerkansen" level={1} />
        <div className="panel">
          <SearchBackup placeholder="Zoeken" type="search" />
        </div>
        <div className="map" />
        <article className="cards">
          {OPPORTUNITIES.map((OPPORTUNITY) => (
            <Card
              key={OPPORTUNITY}
              badge={OPPORTUNITY.badge}
              image="https://picsum.photos/200/300"
              title={OPPORTUNITY.title}
              description={OPPORTUNITY.description}
              date={OPPORTUNITY.date}
              alt={OPPORTUNITY.alt ? OPPORTUNITY.alt : OPPORTUNITY.title}
            />
          ))}
        </article>
      </div>

      <style jsx>
        {`
          .container {
            max-width: 1400px;
            padding: 0 5rem;
            margin: 0 auto;
          }

          .cards {
            display: grid;
            grid-template: 1fr 1fr / repeat(3, 1fr);
            grid-gap: ${spacers.medium};

            margin: ${spacers.medium} 0 6rem;
          }

          .panel {
            background: ${colors.blueLight};
            padding: 3rem;
          }

          .map {
            background: ${colors.blueLight};
            opacity: 0.7;
            height: 50rem;
          }
        `}
      </style>
    </>
  );
};
