import React, { Component } from 'react';

export default class PositionRow extends Component {
	constructor(props) {
		super(props);
		
		this.handleDelete = this.handleDelete.bind(this);
	};
	
	handleDelete() {
		var deleteEvent = {
			type: 'delete',
			position: this.props.position
		}
		this.props.onChange(deleteEvent);
	};
	
	render() {
		return (
			<li>
				{this.props.position.lat}, {this.props.position.lng}
				<button>Set Origin</button>
				<button>Set Destination</button>
				<button onClick={this.handleDelete}>Delete</button>
			</li>
		);
	};
}