import React from 'react';
import { Link } from 'react-router';
import { whoami } from '../reducers/auth'
import axios from 'axios'

export default function (props) {
  let user;
  if (props.user.auth) user = props.user.auth.name
  else user = 'GUEST'
  console.log('STATE:', user)

  // console.log(props)

  return (
    <header>
      <h1 className="logo">Build-A-Box</h1>

      <div className="menu">
        <span style={{marginRight: 7}}>{user.toUpperCase()}</span>
        <Link to='/cart'>
          <span>MY CART</span>
        </Link> 
        <Link to="/login">
          <span>LOGIN</span>
        </Link>
        <Link to="/whoami">
          <span>LOGOUT</span>
         </Link>
        <Link>
          <span>REGISTER</span>
        </Link> 
      </div>
      <div className="clear"></div>
    </header>
  );
}