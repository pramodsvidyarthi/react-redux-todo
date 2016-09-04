import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Footer extends React.Component {
	render() {
		return (
			<footer className="well well-sm clearfix">
				<div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
					<p id="remaining-todos"><strong>{this.props.remaining.length}</strong> item{this.props.remaining.length > 1 ? 's' : ''} left</p>
				</div>
				<div className="col-xs-6 hidden-sm hidden-md hidden-lg pull-right">
					<button type="button" className={"btn btn-link pull-right "+(!this.props.completed.length ? 'hidden' : '')} 
							onClick={this.props.clearcompleted}> Clear Completed
					</button>
				</div>
				<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 center-content">
					<div className="btn-group btn-group-sm" role="group">
				  		<button type="button" className="btn btn-default"><Link to='/'>All</Link></button>
				  		<button type="button" className="btn btn-default"><Link to='active'>Active</Link></button>
				  		<button type="button" className="btn btn-default"><Link to='completed'>Completed</Link></button>
					</div>
				</div>
				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 hidden-xs">
					<button type="button" className={"btn btn-link pull-right "+(!this.props.completed.length ? 'hidden' : '')} 
							onClick={this.props.clearcompleted}> Clear Completed
					</button>
				</div>
			</footer>
		 );
	}
}