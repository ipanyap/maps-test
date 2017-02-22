import React, { Component } from 'react';
import PositionRow from './position-row';

export default class PositionTable extends Component {
	constructor(props) {
		super(props);
	};
	
	render() {
		const listStyle = {
			flex: 2,
			height: 200,
			marginRight: 200,
			overflowY: 'scroll'
		};
		
		const positions = this.props.positions;
		const list = positions.map((position) =>
			<PositionRow position={position} onChange={this.props.onChange} />
		);
		
		return(
			<ul style={listStyle}>
				{list}
			</ul>
		);
	};
}