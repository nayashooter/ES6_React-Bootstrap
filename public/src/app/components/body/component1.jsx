import React          from 'react';


class item1Component extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {
    }
  }

  render() {
	
  	return (
        <h1>Page 1</h1>
  	);
  }
}

export default item1Component