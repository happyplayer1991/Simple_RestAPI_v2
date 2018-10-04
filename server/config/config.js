'use strict';

module.exports = {
	Server: {
		Host: process.env.HOST || '127.0.0.1',
	},
	DB: {
		uri: 'mongodb://localhost:27017/places',
		options: {}
	},
};