import React          from 'react';
import dataHome       from '../../data/home.json!json';

class homeComponent extends React.Component {

  constructor(props) {
    // Always call super() as the first thing you do in an extended constructor!
    super(props)

    // In ES6, initial state is set as a property of the class
    this.state = {
      data: dataHome
    }
  }

  render() {
   var listItems = this.state.data.map(function(item,i) {
      return <tr key={i}>
              <td>{item.name}</td>
              <td>{item.firstname}</td>
              <td>{item.genre}</td>
              <td>{item.country}</td>
              <td>{item.adress}</td>
              <td>{item.codepostal}</td>
              <td><a href={`#/page1/${item.name}`}><i className="fa fa-2x fa-pencil-square"></i></a></td>
              </tr>;
    });


  	return (
        <div className="container">
          <br/>
          <div className="well well-sm">
            <h1 >Home</h1>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>FirstName</th>
                <th>Genre</th>
                <th>Country</th>
                <th>Adress</th>
                <th>Code postal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>

        </div>
  	);
  }
}

export default homeComponent