import React from 'react';
import render from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import TodoModel  from './todoModel.js';
import App from './components/app.js';

let model = new TodoModel('react-todo');

let getAppComponent = (props, state, params) => {
	return <App model={model} route={props.params.filter || 'all'} />;
};

// render.render(<App model={model} />, document.getElementById('app'));

var routes = (
  <Route path="/" component={getAppComponent} >
  	<IndexRoute component={getAppComponent} />
  	<Route path=":filter" component={getAppComponent} />
  </Route>
);

render.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
