'use strict';

const places = require('../controller/place.controller.js');

module.exports = function(app) {
    
    // *** Add new location *** //
    app.post('/api/places', places.create);

    // *** Return List of Places *** //
    app.get('/api/places', places.findAll);

    // *** Return Sepcified Location info or Error if not found *** //
    app.get('/api/places/:id', places.findById);
 
    // *** Update the record/item *** //
    app.put('/api/places', places.update);
 
    // *** Delete a location *** //
    app.delete('/api/places/:id', places.delete);
}