import React, {Component} from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import {STUDENT, SUPERVISOR, TEACHER} from "../../constants";

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getUserDetail(){
      let { currentUser } = this.props;
      let detail = '';
      if(currentUser.first_name != '' && currentUser.last_name != '' )
          detail = `${currentUser.first_name }, ${currentUser.last_name}`;
      else
          detail = currentUser.email;

      switch (currentUser.role){
          case SUPERVISOR:
            detail += ' (SUPERVISOR)';
          break;
          case TEACHER:
              detail += ' (TEACHER)';
              break;
          case STUDENT:
              detail += ' (STUDENT)';
              break;
      }
      return detail;
  }
  dropAccnt() {

      return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
            <span className="header-dropdown-user-info">Welcome {this.getUserDetail()}</span>
            <img src='/img/generic-avatar-icon.png' className="img-avatar" alt={this.props.currentUser.email}/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <DropdownItem><i className="fa fa-bell-o"></i> News<Badge color="info">42</Badge></DropdownItem>
          <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const {...attributes} = this.props;
    return (
      this.dropAccnt()
    );
  }
}

export default HeaderDropdown;
