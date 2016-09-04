/*
**********************NOTE************************ 
using stateless react component when the constructor is called react passes the first parameter as prop 
and there are two more params that is passes along need to figure out what the other two are. implemented in header
and inputfield component.

The other ways of doin would be using
	- React.createClass function 
	- ES6 way using the export default class someclassname extends React.Component {
		render(){}
	}

-
-state can be state of the data or the state of ui i.e editing, deleting etc.

passing data from top to bottom i.e parent component to child and so on. and the control is passed upward direction
from child to parent the control can be referred to as the events that alter the data and so forth.


In the life cycle every time the component passed to the ReactDOM render a instance of it is create and sent to the 
render method, it basically does a createElement and then gives it to the render method. and same goes for all the children
components also.

** In case anytime u need to do a re-render use setstate or forceupdate if the nested values in the props changes. **

** KEEP YOUR COMPONENTS AS 'DUMB' AS POSSIBLE, it means break ur components into smaller components which have their own lifecycle. **
** DON'T MOVE PROPS TO STATE. Its an anti-pattern ** but most commonly u will find need in form input tag default value 
** DON'T SET STATE FROM OUTSIDE THE COMPONENT. Its an anti-pattern ** 

** setState is updating parts of existing state not flushing/replacing the entire state **
** //use components in router to pass multiple components as an object to the app component, which can be used to replace one component with another. **
using refs.methodname we can access the childcomponents methods from parent and ref on the child should be set in parent.

Props are/or should be immutable from the component itself, its always the parents that must provide the new value. 
so never alter props anywhere in the component by setting this.props.something = somevalue, its a anti-pattern

Life Cycle Methods

Birth / Mounting
---------------------
1. Initialize / Construction - initialize in contrast with backbone
2. getDefaultProps() (React.createClass) or MyComponent.defaultProps (ES6	class) 
3. getInitialState() (React.createClass) or	this.state	=	...	(ES6	constructor) 
4. componentWillMount() - beforeRender in contrast with Marionette
5. render()	
6. Children	initialization & life cycle	kickoff
7. componentDidMount()	- afterRender / onDomRefresh in contrast with Marionette. use third party library here

Growth / Update
-----------------
1. componentWillReceiveProps()	
2. shouldComponentUpdate()	
3. render()	
4. Children	Life cycle methods 
5. componentWillUpdate()	

Death / Unmount
----------------
1. componentWillUnmount()	
2. Children	Life cycle	methods 
3. Instance	destroyed	for	Garbage	Collection

callorder
----------

1. render - A -> A.0 -> A.0.0 -> A.0.1 -> A.1 - >A.2.
2. componentDidMount - 	A.2	-> A.1 -> A.0.1	-> A.0.0 ->	A.0	-> A


*/

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.js';
import Input from './inputfield.js';
import TodoItem from './todoitem.js';
import Footer from './footer.js';


const ENTER_KEY = 13;

export default class App extends React.Component {
	// defaultProps: {} ES6 way of getDefaultProps

	constructor(props) {
		super(props);				//can call super with props in case it uses it
		this.state = { 				//ES6 way of getInitialState
			appname: 'todos',
			editing:null,
			// nowShowing: props.route,
		};
		//can also bind the context to the methods in the component with the context of the component here.
		//that way we can avoid methodname.bind(this)  when passed to child components.
		this.subscribeToEvents(props.model);
	}

	subscribeToEvents(model) {
		model.subscribe('add', this.forceUpdate.bind(this));
		model.subscribe('destroy', this.forceUpdate.bind(this));
		model.subscribe('change', this.forceUpdate.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		//Use this as an opportunity to	react to a prop	transition before render() is called by updating the state using this.setState().
		//The old props	can	be	accessed via	this.props. Calling	this.setState()	within this function will not trigger an additional	render.
		// console.log(nextProps); makes sense when used in child components
		// this.setState({
		// 	nowShowing: nextProps.route
		// });
		// debugger;
		console.log(nextProps);
	}

	// shouldComponentUpdate(nextProps, nextState) {
		//prevent unnecessary renders. this method must return something if not don't use.
		//life cycle optimization method we can decide if we really need to do a re-render
		// 	console.log('comes here', nextProps, nextState); 
		// 	return;
	// }

	handleChange(e) {
		//change event gets called only when the value of the input field is altered not when 
		//enter or shift or other keys as such is pressed which will not alter the value of the input field.
		//Here we will be setting the state of the newtodotitle
		// this.setState({
		// 	newTodoTitle: e.target.value
		// });
	}

	handleNewTodoKeyDown(e) {
		//keyup event gets called before input field change event.
		//Here we will be adding the new todo which is in the state to the localstorage by calling a method on the model 
		//and set the state of newtodotitle to empty.

		if(e.keyCode !== ENTER_KEY) {
			return;
		}

		let model = this.props.model,
			val = this.refs.input.value().trim();

		if(val) {
			model.addTodo(val);
			// this.setState({ newTodoTitle: '' });
		}
	}

	destroy(todo) {
		this.props.model.destroy(todo);
		this.forceUpdate(); //since react does not deeply compare props
	}

	destroyAllCompleted() {
		this.props.model.clearAllCompleted();
	}

	toggle(todoToToggle) {
	    this.props.model.toggle(todoToToggle);
	}

	toggleAll(e) {
		this.props.model.toggleAll(e.target.checked);
	}

	edit(todo) {
		this.setState({editing: todo.id});
	}

	cancel() {
		this.setState({editing: null});
	}

	save(todotosave, val) {
		this.props.model.update(todotosave, val);
		this.setState({editing: null});
	}

	isAllTodoCompleted() {
		let todos = this.props.model.todos,
			completedtodos = todos.filter(todo => todo.completed);

		return todos.length === completedtodos.length;
	}

	remainingTodos() {
		let todos = this.props.model.todos;

		let remaining = todos.filter(todo => !todo.completed);

		return remaining;
	}

	completedTodos() {
		let todos = this.props.model.todos;

		let completed = todos.filter(todo => todo.completed);

		return completed;	
	}

	renderMainLayout() {
		let model = this.props.model,
			isallCompleted = this.isAllTodoCompleted();

		if(model.todos.length) {
			return  (
			 <div className="input-group">
		      <span className="input-group-addon">
		        <input checked={isallCompleted} type="checkbox" onChange={this.toggleAll.bind(this)}/>
			  </span>
			  <Input ref="input" onkeydown={this.handleNewTodoKeyDown.bind(this)} />
		    </div>
			);
		}

		return (
			<Input ref="input" onkeydown={this.handleNewTodoKeyDown.bind(this)} />
		);
	}

	renderTodoList() {
		let todos = this.props.model.todos;

		switch(this.props.route) {
			case 'active' : todos = todos.filter(todo => !todo.completed);
							break;
			case 'completed': todos = todos.filter(todo => todo.completed);
							 break;
			default: todos = todos;
		}

		return todos.map(todo => <TodoItem ref={'item'+todo.id} todo={todo} 
			 									 key={todo.id} 
			 									 editing={this.state.editing === todo.id}
			 									 onEdit={this.edit.bind(this, todo)}
			 									 onSave={this.save.bind(this, todo)}
			 									 onCancel={this.cancel.bind(this)}
			 									 onToggle={this.toggle.bind(this, todo)}
												 onDestroy={this.destroy.bind(this, todo)} 
										/>
							  );
	}

	renderFooter() {
		let model = this.props.model;
		const length = model.todos.length;

		if(length) {
			return <Footer remaining={this.remainingTodos.call(this)} completed={this.completedTodos.call(this)} clearcompleted={this.destroyAllCompleted.bind(this)}/>
		}

		return;
	}

	render() {
		/* 1. Never call setstate in the render method it would be an anti-pattern reason being setting state will
		      kickoff another call to render and witll end up with max call stack error where there is no base condition
		      where the recursive function should end, keep it as much as a pure function.

		    2. Never query the dom in this method i.e dont do ReactDOM.findDOMNode(this), keep it as much as a pure function.
		       we are trying to find the node that is not in the dom, its still not mounted to the root/parent node.

		    3. Never set the props here to new value not just here through out the component do not do it reason being 
		       props should always be provided by the parent and should be immutable within the component

		 */
		return (
		<div className="row">
		  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			  <Header appname={this.state.appname} />
		 	  <div className="form-group">
			      { this.renderMainLayout() }		    
		 	  </div>
		 	  <ul className="list-group" id="todo-list">
			     { this.renderTodoList() }
		   	  </ul>
		   	  { this.renderFooter() }
		  </div>
	  </div>
	);
  }

  componentDidMount() {
  	//called only once after the initial render.
  	// console.log(this.props);
  }

  componentDidMount() {
  	//do dom manipulations but watch for infinite render loop if ur updating state here 
  	//not a good idea to update state here since it will cause a render again and do so
  	//only if you have a base condition that will terminate the infinite loop
  }
}