import React, {Component} from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';

export default function (props) {
  return (
    <div id="main" className="container-fluid">
          <div className="col-xs-1">
            <SidebarContainer />
          </div>
          <div className="col-xs-11">
            <HeaderContainer />
              {
                props.children && React.cloneElement(props.children, props)
              }
          </div>
    </div>
  );
}