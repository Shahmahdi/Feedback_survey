import React from 'react'
import { connect } from 'react-redux';
import { SurveyFormFields } from './Form';
import { submitSurvey } from '../../actions/Index';
import { withRouter, RouteComponentProps } from 'react-router';
import { History } from 'history';

const FormReviewComponent = (props: RouteComponentProps & {
  onCancel: () => void;
  formValues: any;
  submitSurvey: (formValue: any, history: History) => void;
}) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {SurveyFormFields.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          <div>{props.formValues[field.name]}</div>
        </div>
      ))}
      <button className="yellow darken-3 white-text btn-flat" onClick={props.onCancel}>
        Back
      </button>
      <button 
        className="green right white-text btn-flat" 
        onClick={() => props.submitSurvey(props.formValues, props.history)}
      >
        Send SurveyForm
        <i className="material-icon right">email</i>
      </button>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return { formValues: state.form.surveyform.values };
}

export const FormReview = connect(mapStateToProps, { submitSurvey })(withRouter(FormReviewComponent));
