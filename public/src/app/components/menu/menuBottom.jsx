import React              from 'react';

import { Navbar }         from 'react-bootstrap';
import { Nav }            from 'react-bootstrap';
import { NavItem }        from 'react-bootstrap';
import { NavDropdown }    from 'react-bootstrap';
import { MenuItem }       from 'react-bootstrap';


class MenuBottomComponent extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {
    }
  }

  render() {
	
  	return (
      <Navbar inverse fixedBottom>
        <div className="text-center">
            <span className="label"> JSPM ES6 React-Bootstrap </span>
        </div>
      </Navbar>
  	);
  }
}

export default MenuBottomComponent