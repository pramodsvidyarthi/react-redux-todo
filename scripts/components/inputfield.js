// using a statless component here, its a pure function which takes some arguments and returns a value;
//when u set a ref to a stateless component in the parent it will return null in this.refs.refname
//app.js was setting ref to this component and could not be retrieved in the refs property of the parent
//was returnig null. so changed to a stateful react component.

import React from 'react';
import ReactDOM from 'react-dom';


export default class Input extends React.Component {
	value () { 
	  return ReactDOM.findDOMNode(this).value;
	}

	render() {
		return (
			  <input type="text" className="form-control" placeholder="What needs to be done" onKeyDown={this.props.onkeydown} />
			);
		}	
	}


