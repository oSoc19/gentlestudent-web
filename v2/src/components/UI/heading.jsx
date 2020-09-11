import PropTypes from 'prop-types';
import { fonts, colors } from '../../assets/styles';

const Heading = ({ color, title, level, classNames }) => {
  const H = `h${level}`;
  return (
    <H className={`title ${classNames}`}>
      {title}
      <style jsx>
        {`
          .title {
            color: ${color || colors.primary};
            font-family: ${fonts.titles};
            font-weight: 600;
          }

          h1 {
            font-size: 5.6rem;
            margin: 1.5rem 0 2rem 0;
          }

          h2 {
            font-size: 2rem;
            line-height: 2.7rem;
          }

          h3 {
            font-size: 1.8rem;
          }

          h4 {
            font-size: 1.5rem;
          }

          h5 {
            font-size: 1.2rem;
          }

          h6 {
            font-size: 1rem;
          }

          @media (max-width: 900px) {
            h1 {
              font-size: 4rem;
            }
          }

          @media (max-width: 550px) {
            h1 {
              font-size: 3rem;
            }
          }
        `}
      </style>
    </H>
  );
};

Heading.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  classNames: PropTypes.string,
  level: PropTypes.number
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
