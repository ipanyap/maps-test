import React, { Component } from 'react';

/** Class representing each row of the position table. */
export default class PositionRow extends Component {
	/**
     * Create a row displaying marker's position.
     * @param {JSON} props - The props data.
     */
	constructor(props) {
		super(props);
		
		this.handleOrigin = this.handleOrigin.bind(this);
		this.handleDestination = this.handleDestination.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	};
	
	/**
     * Create an event to be fired when button 'Set Origin' is clicked.
     */
	handleOrigin() {
		var originEvent = {
			type: 'origin',
			position: this.props.position
		};
		this.props.onChange(originEvent);
	};
	
	/**
     * Create an event to be fired when button 'Set Destination' is clicked.
     */
	handleDestination() {
		var destinationEvent = {
			type: 'destination',
			position: this.props.position
		};
		this.props.onChange(destinationEvent);
	};
	
	/**
     * Create an event to be fired when button 'Delete' is clicked.
     */
	handleDelete() {
		var deleteEvent = {
			type: 'delete',
			position: this.props.position
		};
		this.props.onChange(deleteEvent);
	};
	
	/**
     * Render the row.
     */
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