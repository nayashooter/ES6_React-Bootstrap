import React      from 'react';
import MenuTop    from '../menu/menuTop.jsx!jsx' 
import MenuBottom    from '../menu/menuBottom.jsx!jsx' 


class LayoutComponent extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {
    }
  }

  render() {
	
  	return (

		  <div className="container-fluid">
        <MenuTop/>

        <MenuBottom/>
  		</div>

  	);
  }
}

export default LayoutComponent