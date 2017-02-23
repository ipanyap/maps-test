import React, { Component } from 'react';

/** Class representing the form to calculate route between two location points. */
export default class RouteForm extends Component {
	/**
     * Create a form to calculate route.
     * @param {JSON} props - The props data.
     */
	constructor(props) {
		super(props);
	};
	
	/**
     * Render the form.
     */
	render() {
		const formStyle = {
			float: 'left',
			maxWidth: 200,
			height: 200,
			margin: '0px',
			padding: '1px 5px',
			backgroundColor: '#B0C4DE'
		};
		
		const data = this.props.data;
		const origin = (data.origin === null) ? '' : (data.origin.lat + ',' + data.origin.lng);
		const destination = (data.destination === null) ? '' : (data.destination.lat + ',' + data.destination.lng);
		
		return (
			<div style={formStyle}>
				<label>
					Origin:
					<input name="origin" type="text" value={origin} />
				</label>
				<label>
					Destination:
					<input name="destination" type="text" value={destination} />
				</label>
				<input type="submit" value="Calculate Route!" onClick={this.props.onClick} />
			</div>
		);
	};
}