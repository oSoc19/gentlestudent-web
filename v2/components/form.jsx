import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from '../hooks';
import { Heading, FormField } from './UI';

const Form = ({ title, fields, children, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const { onChange, values, isValid } = useForm(fields);

  /*
   * Render fields from fields prop
   */
  const renderFields = () =>
    fields.map((field) => (
      <FormField key={field.name} {...field} setField={onChange} submitting={submitting} />
    ));

  /*
   * Pass form values to parent's onSubmit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    } else {
      setSubmitting(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {title && (
        <div className="section-header">
          <Heading level={2} title={title} />
        </div>
      )}
      {fields && renderFields()}
      {children}
      <style jsx>
        {`
          form {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 2rem;
            border-radius: 2rem;
            box-shadow: 0 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.1);
          }

          .section-header {
            border-radius: 2rem 2rem 0 0;
            padding: 2rem;
          }
        `}
      </style>
    </form>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
