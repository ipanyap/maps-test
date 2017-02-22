import React, { Component } from 'react';
import SimpleMap from './simple-map';
import PositionTable from './position-table';
import RouteForm from './route-form';

export default class IndexPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			places: [],
			origin: null,
			destination: null
		};
		
		this.handleMapEvent = this.handleMapEvent.bind(this);
	};
	
	handleMapEvent(e) {
		if(e.type === 'add') {
			this.setState((prevState, props) => ({
				places: prevState.places.concat([e.position])
			}));
		}
		else if(e.type === 'delete') {
			var places = this.state.places.slice();
			var index = places.indexOf(e.position);
			if(index > -1) {
				places.splice(index, 1);
				this.setState((prevState, props) => ({
					places: places
				}));
			}
		}
	};
	
	render() {
		const places = this.state.places;
		
		const bottomStyle = {
			flex: 1,
			flexDirection: 'row',
			height: 200,
			border: '1px solid black',
		};
		
		return (
			<div>
				<SimpleMap positions={places} onChange={this.handleMapEvent} />
				<div style={bottomStyle}>
					<PositionTable positions={places} onChange={this.handleMapEvent} />
					<RouteForm />
				</div>
			</div>
		);
	};
}