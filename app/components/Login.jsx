import React from 'react'
import {router} from 'react-router'

export const Login = ({ login }) => (
 <form onSubmit={evt => {
   evt.preventDefault()
   login(evt.target.username.value, evt.target.password.value)
   browserHistory.push('/')
 } } style={{marginLeft: 5}}>
   <h6>Email:</h6><input name="username" />
   <h6>Password:</h6><input name="password" type="password" />
   <div>
   <input type="submit" className='btn btn-primary' style={{marginTop: 5, marginRight: 5}} value="Login" />
   </div>
 </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
 state => ({}),
 {login},
) (Login)