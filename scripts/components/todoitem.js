//if child has to pass the received props to its children use Object.assign and add the received props extra props to the child
import React from 'react';
import ReactDOM from 'react-dom'; 

const ENTER_KEY = 13,
	  ESCAPE_KEY = 27;

export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editText: this.props.todo.title 
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.todo !== this.props.todo ||
			nextProps.editing !== this.props.editing ||
			nextState.editText !== this.state.editText
		);
	}

	componentDidUpdate() {
		if(this.state.editText) {
			var node = ReactDOM.findDOMNode(this.refs.editField);
	    	node.focus();
	    	node.setSelectionRange(node.value.length, node.value.length);
		}
	}

	handleEdit() {
		this.props.onEdit();
		this.setState({editText: this.props.todo.title});
	}

	handleKeyDown(e) {
		if(e.keyCode === ENTER_KEY) {
			 this.handleSubmit(event);
		 }	else if(e.keyCode === ESCAPE_KEY) {
		 	this.setState({editText: this.props.todo.title});
			this.props.onCancel(event);
		 }		            
	}

	handleSubmit(event) {
			const val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
				this.props.onDestroy();
			}
	}	

	handleChange(e) {
		if (this.props.editing) {
			this.setState({editText: e.target.value});
		}
	}

	render() {
		return (
			<li key={this.props.todo.id} className={"list-group-item "+(this.props.todo.completed ? "completed" : "")}>
				<input type="text" className={"form-control hidden "+(this.props.editing ? "editing" : "")} 
					   ref="editField"
					   autoFocus={this.state.isEditing} 
					   value={this.state.editText}
					   onKeyDown={this.handleKeyDown.bind(this)}
					   onChange={this.handleChange.bind(this)}
					   onBlur={this.handleSubmit.bind(this)}
			    />
				<input type="checkbox" checked={this.props.todo.completed} onChange={this.props.onToggle} />
				<span className="lead" onDoubleClick={this.handleEdit.bind(this)}> {this.props.todo.title} </span>
				<button type="button" className="btn btn-default close" aria-label="Close" onClick={this.props.onDestroy}>
					<span aria-hidden="true" className="pull-right">&times;</span>
				</button>
			</li>
		);
   }	
}