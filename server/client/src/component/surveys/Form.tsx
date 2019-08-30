import React, { Component } from 'react'
import { Field, reduxForm, WrappedFieldProps } from 'redux-form';
import { Link } from 'react-router-dom';
import { EmailValidation } from '../../utils/emailValidation';

const FormField = (props: WrappedFieldProps & {
  label: string;
}) => (
    <div>
      <label>{props.label}</label>
      <input {...props.input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  )

export const SurveyFormFields = [
  { label: 'Survey title', name: 'title' },
  { label: 'Email subject', name: 'subject' },
  { label: 'Email body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' }
];

interface SurveyFormExternalProps {
  onSurveySubmit: any;
}

interface ReduxFormInternalProps extends SurveyFormExternalProps {
  handleSubmit: any
}

class SurveyForm extends Component<ReduxFormInternalProps, any> {
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {SurveyFormFields.map(field => (
            <Field
              key={field.name}
              label={field.label}
              type="text"
              name={field.name}
              component={FormField}
            />
          ))}
          <Link
            to="/surveys"
            className="red btn-flat white-text"
          >
            Cancel
          </Link>
          <button
            className="teal btn-flat right white-text"
            type="submit"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

interface SurveyFormField {
  title: string;
  subject: string;
  body: string;
  recipients: string | undefined;
}

const validate = (values: SurveyFormField) => {
  const error = {} as SurveyFormField;

  error.recipients = EmailValidation(values.recipients || '');

  if (!values.title) {
    error.title = 'You must provide a title';
  }
  if (!values.subject) {
    error.subject = 'You must provide email subject';
  }
  if (!values.body) {
    error.body = 'You must provide email body';
  }
  if (!values.recipients) {
    error.recipients = 'You must provide emails';
  }

  return error;
}

export default reduxForm({
  validate,
  form: 'surveyform',
  destroyOnUnmount: false
})(SurveyForm as any) as any
