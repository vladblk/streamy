import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if(error && touched) {
      return (
        <div className="ui error message">
          <div className="header">
            {error}
          </div>
        </div>
      );
    };
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input { ...input } autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" label="Stream title" component={this.renderInput} />
        <Field name="description" label="Stream description" component={this.renderInput} />
        <button className="ui button primary">Submit</button>
      </form>
    );
  };
};

const validate = (formValues) => {
  const errors = {};

  if(!formValues.title) {
    errors.title = 'Streams must have a title';
  };
  if(!formValues.description) {
    errors.description = 'Streams must have a description'
  };

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
