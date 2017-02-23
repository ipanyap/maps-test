'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sequelize = require('sequelize');

var Db = function () {
	function Db() {
		_classCallCheck(this, Db);

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
	}

	_createClass(Db, [{
		key: 'getRecords',
		value: function getRecords() {
			return this.loc.findAll();
		}
	}, {
		key: 'addRecord',
		value: function addRecord(record) {
			return this.loc.create({
				lat: record.lat,
				lng: record.lng
			});
		}
	}, {
		key: 'deleteRecord',
		value: function deleteRecord(record) {
			return this.loc.destroy({
				where: {
					lat: record.lat,
					lng: record.lng
				}
			});
		}
	}]);

	return Db;
}();

;

module.exports = new Db();