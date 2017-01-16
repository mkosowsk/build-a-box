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
          <Link to='/products/category/Motherboard'>Motherboards</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/products/category/CPU'>CPUs</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/products/category/GPU'>GPUs</Link>
        </h4>
      </section>
       <section>
        <h4 className="menu-item">
          <Link to='/products/category/RAM'>RAM</Link>
        </h4>
      </section>
       <section>
        <h4 className="menu-item">
          <Link to='/products/category/HDD'>HDDs</Link>
        </h4>
      </section>
       <section>
        <h4 className="menu-item">
          <Link to='/products/category/SSD'>SSDs</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/products/category/Case'>Cases</Link>
        </h4>
      </section>
    </sidebar>
  );
}
