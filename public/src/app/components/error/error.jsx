import React          from 'react';


class errorComponent extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {
    }
  }

  render() {
	
  	return (
        <h1>OUPS!!!</h1>
  	);
  }
}

export default errorComponent