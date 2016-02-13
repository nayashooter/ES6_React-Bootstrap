import React              from 'react';

import { Navbar }         from 'react-bootstrap';
import { Nav }            from 'react-bootstrap';
import { NavItem }        from 'react-bootstrap';
import { NavDropdown }    from 'react-bootstrap';
import { MenuItem }       from 'react-bootstrap';
import { Link }           from 'react-router';
import { NavItemLink  }           from 'react-router-bootstrap';

class MenuTopComponent extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {
    }
  }

  render() {
	
  	return (
      <div>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="/#/home">Home</NavItem>
            <NavItem href="/#/page1">Page1</NavItem>
            <NavItem href="/#/page2">Page2</NavItem>
            <NavItem href="/#/page3">Page3</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      {this.props.children}
      
      </div>
  	);
  }
}

export default MenuTopComponent