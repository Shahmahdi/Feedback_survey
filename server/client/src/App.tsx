import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './component/Header';
import { connect } from 'react-redux';
import { FetchUser } from './actions/Index';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import SurveyNew from './pages/SurveyNew';

interface AppProps {
  FetchUser: () => void
}

class App extends Component<AppProps, any> {

  componentDidMount() {
    this.props.FetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/surveys/new" component={SurveyNew} />
            <Route exact={true} path="/surveys" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}


export default connect(null, { FetchUser })(App);
