import React from 'react';
import {Link} from 'react-router';

export default function (props) {

  const image = "monitor.svg"

  return (
    <sidebar>
      <Link to='/'>
        <img src={`${image}`} className="logo"/>
      </Link>
      <section>
        <h4 className="menu-item">
          <Link to='/motherboards'>Motherboards</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/CPUs'>CPUs</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/Cases'>Cases</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/GPUs'>GPUs</Link>
        </h4>
      </section>
    </sidebar>
  );
}
