import React, { Component } from 'react'
import SurveyForm from '../component/surveys/Form';
import { FormReview } from '../component/surveys/FormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {

  state = { showFormReview: false }

  render() {
    return (
      <div>
        {this.state.showFormReview ?
          <FormReview onCancel={() => this.setState({ showFormReview: false })} />
          : <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
        }
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyform'
})(SurveyNew as any);
