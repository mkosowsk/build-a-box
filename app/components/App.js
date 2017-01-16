import React, {Component} from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';

export default function (props) {
  return (
    <div id="main" className="container-fluid">
      <div className="row">
          <div className="col-xs-2">
            <SidebarContainer />
          </div>
          <div className="col-xs-10">
            <HeaderContainer />
              {
                props.children && React.cloneElement(props.children, props)
              }
          </div>
          </div>
    </div>
  );
}