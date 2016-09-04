// using a statless component here, its a pure function which takes some arguments and returns a value;

import React from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
	return (
		<div className="page-header">
		 	<h1>{props.appname.toUpperCase()}</h1>
		 </div>
	);
}