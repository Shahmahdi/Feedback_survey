import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/Index';

interface SurveyListInternalProps {
  fetchSurveys: () => void;
  surveys: [];
}

class SurveyListComponent extends Component<SurveyListInternalProps, any> {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    return (
      <div>
        {this.props.surveys.reverse().map((survey: any) => (
          <div className="card darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Send on: {new Date(survey.dateSend).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    surveys: state.surveys
  }
}

export const SurveyList = connect(mapStateToProps, { fetchSurveys })(SurveyListComponent);
