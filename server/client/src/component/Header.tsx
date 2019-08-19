import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

interface UserModel {
  name: string;
  credits: number;
}

interface HeaderProps {
  auth: UserModel;
}

class Header extends Component<HeaderProps, {}> {
  render() {
    return (
      <nav>
        {console.log(this.props.auth)}
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="brand-logo"
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.props.auth ?
              <>
                <li><Payment /></li>
                <li style={{ margin: '0 10px' }}>
                  Credits: {this.props.auth.credits}
                </li>
                <li>
                  <a href="/api/logout">Logout</a>
                </li> </> : this.props.auth === false ?
                <li>
                  <a href="/auth/google">Sign in with Google</a>
                </li> : undefined}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
