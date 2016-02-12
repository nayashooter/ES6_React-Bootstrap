import React              		                    from 'react';

import { Router, Route, Link , browserHistory }   from 'react-router';
import Component1				                          from '../body/component1.jsx!jsx';
import Component2				                          from '../body/component2.jsx!jsx';
import Component3				                          from '../body/component3.jsx!jsx';
import ErrorComponent                             from '../error/error.jsx!jsx'; 

class routerComponent extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {
    }
  }

  render() {
	
  	return (
      <Router history={browserHistory}>
	    <Route path="/" component={Component1}>
	      <Route path="page2" component={Component2}/>
	      <Route path="page3" component={Component3}>
	      </Route>
	      <Route path="*" component={ErrorComponent}/>
	    </Route>
	  </Router>
  	);
  }
}

export default routerComponent