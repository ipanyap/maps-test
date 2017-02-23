import React, { Component } from 'react';

export default class PositionRow extends Component {
	constructor(props) {
		super(props);
		
		this.handleOrigin = this.handleOrigin.bind(this);
		this.handleDestination = this.handleDestination.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	};
	
	handleOrigin() {
		var originEvent = {
			type: 'origin',
			position: this.props.position
		};
		this.props.onChange(originEvent);
	};
	
	handleDestination() {
		var destinationEvent = {
			type: 'destination',
			position: this.props.position
		};
		this.props.onChange(destinationEvent);
	};
	
	handleDelete() {
		var deleteEvent = {
			type: 'delete',
			position: this.props.position
		};
		this.props.onChange(deleteEvent);
	};
	
	render() {
		const spanStyle = {
			float: 'left',
			width: 500
		};
		
		return (
			<li>
				<span style={spanStyle}>lat: {this.props.position.lat}, lng: {this.props.position.lng}</span>
				<button onClick={this.handleOrigin}>Set Origin</button>
				<button onClick={this.handleDestination}>Set Destination</button>
				<button onClick={this.handleDelete}>Delete</button>
			</li>
		);
	};
}