var Sequelize = require('sequelize');

class Db {
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
	
	getRecords() {
		return this.loc.findAll();
	};
	
	addRecord(record) {
		return this.loc.create({
			lat: record.lat,
			lng: record.lng
		});
	};
	
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