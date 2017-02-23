var Sequelize = require('sequelize');

/** Class to handle all database connection using ORM. */
class Db {
	/**
     * Create db connection instance.
     */
	constructor() {
		var sequelize = new Sequelize(process.env.DB_URL);
		this.loc = sequelize.define('locations', {
			lat: {
				type: Sequelize.DECIMAL
			},
			lng: {
				type: Sequelize.DECIMAL
			}
		}, {
			timestamps: false,
			freezeTableName: true
		});
	};
	
	/**
     * Get all marker's records.
     * @return {Promise} The promise object.
     */
	getRecords() {
		return this.loc.findAll();
	};
	
	/**
     * Add a marker record.
	 * @param {JSON} record - The event object.
     * @return {Promise} The promise object.
     */
	addRecord(record) {
		return this.loc.create({
			lat: record.lat,
			lng: record.lng
		});
	};
	
	/**
     * Delete a marker record.
	 * @param {JSON} record - The event object.
     * @return {Promise} The promise object.
     */
	deleteRecord(record) {
		return this.loc.destroy({
			where: {
				lat: record.lat,
				lng: record.lng
			}
		});
	};
};

module.exports = new Db();