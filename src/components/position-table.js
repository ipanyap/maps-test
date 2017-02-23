import React, { Component } from 'react';
import PositionRow from './position-row';

/** Class representing the position table. */
export default class PositionTable extends Component {
	/**
     * Create a table displaying all marker's positions.
     * @param {JSON} props - The props data.
     */
	constructor(props) {
		super(props);
	};
	
	/**
     * Render the table.
     */
	render() {
		/*const listStyle = {
			flex: 2,
			height: 200,
			margin: '0px 250px 0px 0px',
			overflowY: 'scroll',
			//display: 'inline-block',
			backgroundColor: '#EEEEEE',
			border: '1px solid black'
		};*/
		
		const positions = this.props.positions;
		const list = positions.map((position) =>
			<PositionRow position={position} onChange={this.props.onChange} />
		);
		
		return(
			<ul>
				{list}
			</ul>
		);
	};
}