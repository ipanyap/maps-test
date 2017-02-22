import React, { Component } from 'react';

export default class RouteForm extends Component {
	constructor(props) {
		super(props);
	};
	
	render() {
		const formStyle = {
			position: 'relative',
			width: 200,
			right: 0,
			height: 100
		};
		
		const data = this.props.data;
		const origin = (data.origin === null) ? '' : (data.origin.lat + ',' + data.origin.lng);
		const destination = (data.destination === null) ? '' : (data.destination.lat + ',' + data.destination.lng);
		
		return (
			<fieldset style={formStyle}>
				<label>
					Origin:
					<input name="origin" type="text" value={origin} />
				</label>
				<label>
					Destination:
					<input name="destination" type="text" value={destination} />
				</label>
				<input type="submit" value="Calculate Route!" onClick={this.props.onClick} />
			</fieldset>
		);
	};
}