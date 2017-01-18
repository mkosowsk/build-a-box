import React from 'react'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name" style={{marginLeft: 5 ,marginRight: 10, fontSize: 20}}>{user && user.name}</span>
    <button className="logout btn btn-primary" style={{marginTop: 5, marginRight: 5}} onClick={logout}>Logout</button>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)