import React from 'react'
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Dashboard!</h1>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}
