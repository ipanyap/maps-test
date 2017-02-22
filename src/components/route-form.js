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
			height: 200
		};
		
		return (
			<fieldset style={formStyle}>
				<label>
					Origin:
					<input name="origin" type="text" />
				</label>
				<label>
					Destination:
					<input name="destination" type="text" />
				</label>
				<input type="submit" value="Calculate Destination!" />
			</fieldset>
		);
	};
}