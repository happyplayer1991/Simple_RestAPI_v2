
const Place = require('../model/place.model');

// *** Add new location *** //
exports.create = (req, res) => {
    Place.create({
        "locationName": req.body.locationName, 
        "description":  req.body.description, 
        "latitude":     req.body.latitude,
        "longitude":    req.body.longitude
        }).then(place => {		
        // Send created place to client
        res.json(place);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });	
};
 
// *** Return List of Places *** //
exports.findAll = (req, res) => {
    Place.findAll().then(places => {
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