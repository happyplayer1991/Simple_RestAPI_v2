'use strict';

const Place = require('../model/place.model');

// *** Add new location *** //
exports.create = (req, res) => {
    Place.create(req.body, function (err, place) {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "error", details: err});
        }
        res.json(place);
    });
};
 
// *** Return List of Places *** //
exports.findAll = (req, res) => {
    Place.find({}).then(places => {
        // Send all places to Client
        res.json(places.sort(function(c1, c2) {return c1.id - c2.id}));
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};

// *** Return Sepcified Location info or Error if not found *** //
exports.findById = (req, res) => {	
    Place.findById(req.params.id).then(place => {
        res.json(place);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};
 
// *** Update the record/item *** //
exports.update = (req, res) => {
	Place.update(req.body, 
			{ where: {id: req.body.id} }).then(() => {
				res.status(200).json( { mgs: "Updated Successfully -> Place Id = " + id } );
			}).catch(err => {
				console.log(err);
				res.status(500).json({msg: "error", details: err});
			});
};

// *** Delete a location *** //
exports.delete = (req, res) => {
	Place.destroy({
			where: { id: req.params.id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Place Id = ' + id } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};