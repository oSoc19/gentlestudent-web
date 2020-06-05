import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSteps } from '../hooks';
import { colors, breakpoints } from '../assets/styles';
import { Button } from './UI';
import Form from './form';

const FormWithSteps = ({ steps, onCompleteAll }) => {
  const { currentStep, isFinalStep, stepForward, stepBack, stepTo } = useSteps(steps.length);

  /*
   * Result contains values of all form steps
   */
  const [result, setResult] = useState({});

  /*
   * Add current step values to result & continue
   */
  const submitStep = (values) => {
    /*
     * Add current step values to multi step form result
     */
    setResult({ ...result, ...values });

    /*
     * Continue
     */
    stepForward();
  };

  /*
   * Create array containing step titles
   */
  const stepTitles = steps.reduce((all, step) => all.concat(step.title), []);

  /*
   * Current step props
   */
  const { title, fields } = steps[currentStep];

  const stepsLeft = steps.length - currentStep - 1;

  return (
    <Form onSubmit={submitStep} title={title} fields={fields}>
      <div className="stepper">
        <Button type="button" onClick={stepBack}>
          Stap terug
        </Button>
        {stepTitles.map((title, i) => (
          <p key={i} className={i === currentStep && 'active'}>
            {title}
          </p>
        ))}
        {!isFinalStep ? (
          <Button type="submit" onSubmit={submitStep}>
            <div className="step-indicator">
              <span>{stepsLeft}</span>
            </div>
            Ga door
          </Button>
        ) : (
          <Button type="submit" onClick={onCompleteAll(result)}>
            Bevestig
          </Button>
        )}
      </div>
      <style jsx>
        {`
          .stepper {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${colors.white};
            box-shadow: 0 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.2);
            margin: 0 calc(15vw - 4.5rem);
          }

          .active {
            color: ${colors.primary};
          }

          .step-indicator {
            position: absolute;
            font-size: 1.2rem;
            display: flex;
            height: 3rem;
            width: 3rem;
            top: -0.5rem;
            right: -0.5rem;
            border-radius: 1.5rem;
            color: ${colors.orange};
            border: 1px solid ${colors.orange};
            background: ${colors.white};
          }

          .step-indicator > span {
            margin: auto;
          }

          @media (max-width: ${breakpoints.medium}) {
            .stepper {
              margin: 0;
            }
          }
        `}
      </style>
    </Form>
  );
};

FormWithSteps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.arrayOf(PropTypes.object)
    })
  ),
  onCompleteAll: PropTypes.func
};

export default FormWithSteps;