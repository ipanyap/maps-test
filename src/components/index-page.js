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
			destination: null,
			newRoute: false
		};
		
		this.handleMapEvent = this.handleMapEvent.bind(this);
		this.handleRouteEvent = this.handleRouteEvent.bind(this);
	};
	
	handleMapEvent(e) {
		if(e.type === 'add') {
			this.setState((prevState, props) => ({
				places: prevState.places.concat([e.position])
			}));
		}
		else if(e.type === 'route-done') {
			this.setState({ newRoute: false });
		}
		else {
			var places = this.state.places.slice();
			var index = places.indexOf(e.position);
			if(index > -1) {
				if(e.type === 'delete') {
					var origin = (this.state.origin === e.position) ? null : this.state.origin;
					var dest = (this.state.destination === e.position) ? null : this.state.destination;
					places.splice(index, 1);
					this.setState((prevState, props) => ({
						places: places,
						origin: origin,
						destination: dest
					}));
				}
				else if(e.type === 'origin') {
					this.setState((prevState, props) => ({
						origin: places[index]
					}));
				}
				else if(e.type === 'destination') {
					this.setState((prevState, props) => ({
						destination: places[index]
					}));
				}
			}
		}
	};
	
	handleRouteEvent() {
		this.setState({ newRoute: true });
	};
	
	render() {
		const state = this.state;
		const places = this.state.places;
		const newRoute = this.state.newRoute;
		const edge = {
			origin: this.state.origin,
			destination: this.state.destination
		};
		
		const bottomStyle = {
			flex: 1,
			flexDirection: 'row',
			height: 200,
			border: '1px solid black',
		};
		
		return (
			<div>
				<SimpleMap data={state} onChange={this.handleMapEvent} />
				<div style={bottomStyle}>
					<PositionTable positions={places} onChange={this.handleMapEvent} />
					<RouteForm data={edge} onClick={this.handleRouteEvent} />
				</div>
			</div>
		);
	};
}