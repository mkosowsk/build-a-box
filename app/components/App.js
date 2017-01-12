import React, {Component} from 'react';

import HeaderContainer from '../containers/HeaderContainer';
// import SidebarContainer from '../containers/SidebarContainer';

export default function (props) {
  return (
    <div id="main" className="container-fluid">
      <HeaderContainer />
      {/*
      <div className="col-xs-2">
        <SidebarContainer />
      </div>
    */}
      <div className="col-xs-10">
        {
          props.children && React.cloneElement(props.children, props)
        }
      </div>
      
    </div>
  );
}