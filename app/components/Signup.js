import React from 'react'
import {router} from 'react-router'
import { browserHistory } from 'react-router'
import { createUser } from '../action-creators/header'

function handleSubmit(e){	
	e.preventDefault()

  let formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
  }

	createUser(formData)
	browserHistory.push('/Login')
	alert('Account created! Please log in.')
}

export const Signup = ({ signup }) => (

 <form onSubmit={(e)=>(handleSubmit(e))}>
   <h6>Name:</h6><input name="name" />
   <h6>Email:</h6><input name="email" />
   <h6>Password:</h6><input name="password" type="password" />
   <div>
     <input type="submit" className='btn btn-primary' style={{marginTop: 5, marginRight: 5}} value="Signup" />
   </div>
 </form>
)

import {signup} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
 state => ({}),
 {Signup},
) (Signup)