import React, { Component } from 'react';
import { Search20, Notification20, AppSwitcher20 } from '@carbon/icons-react';
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
} from "carbon-components-react/lib/components/UIShell";

class Navbar extends Component
{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Header></Header>
    );
  }
}

export default Navbar;
