import React, { Component } from 'react';
import SimpleMap from './simple-map';
import PositionTable from './position-table';
import RouteForm from './route-form';

/** Class representing the whole index page. */
export default class IndexPage extends Component {
	/**
     * Create an index page.
     * @param {JSON} props - The props data.
     */
	constructor(props) {
		super(props);
		
		this.state = {
			places: [],
			origin: null,
			destination: null,
			newRoute: false
		};
		
		this.axios = require('axios');
		this.handleMapEvent = this.handleMapEvent.bind(this);
		this.handleRouteEvent = this.handleRouteEvent.bind(this);
	};
	
	/**
     * Process map events such as: add, delete marker, set origin/destination, and route.
     * @param {JSON} e -s The event object.
     */
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
					this.axios.post('/delete', e.position).then((res) => {
						if(res.status === 200) {
							var origin = (this.state.origin === e.position) ? null : this.state.origin;
							var dest = (this.state.destination === e.position) ? null : this.state.destination;
							places.splice(index, 1);
							this.setState((prevState, props) => ({
								places: places,
								origin: origin,
								destination: dest
							}));
						}
					});
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
	
	/**
     * Set the route state to true, causing the maps API to calculate direction.
     */
	handleRouteEvent() {
		this.setState({ newRoute: true });
	};
	
	/**
     * Render the page.
     */
	render() {
		const state = this.state;
		const places = this.state.places;
		const newRoute = this.state.newRoute;
		const edge = {
			origin: this.state.origin,
			destination: this.state.destination
		};
		
		const articleStyle = {
			height: 200,
			margin: '0px 0px 0px 200px',
			padding: '1px',
			borderLeft: '1px solid gray',
			backgroundColor: '#EEEEEE',
			overflowY: 'scroll'
		};
		
		return (
			<div>
				<SimpleMap data={state} onChange={this.handleMapEvent} />
				<RouteForm data={edge} onClick={this.handleRouteEvent} />
				<div style={articleStyle}>
					<PositionTable positions={places} onChange={this.handleMapEvent} />
				</div>
			</div>
		);
	};
}