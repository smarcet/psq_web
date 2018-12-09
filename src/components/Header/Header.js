import React, {Component} from 'react';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    console.log("Header.render");
    let { currentUser } = this.props;
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
          {currentUser.isLoggedUser &&
          <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
              <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
          }
          {currentUser.isLoggedUser &&
          <Nav className="d-md-down-none" navbar>
              <NavItem className="px-3">
                  <NavLink href="#">Dashboard</NavLink>
              </NavItem>
          </Nav>
          }

        <Nav className="ml-auto" navbar>
          <HeaderDropdown currentUser={currentUser}/>
        </Nav>

      </header>
    );
  }
}

export default Header;
