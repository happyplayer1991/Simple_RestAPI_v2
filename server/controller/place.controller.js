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
    Place.find().then(places => {
        res.json(places);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};

// *** Return Sepcified Location info or Error if not found *** //
exports.findByLocation = (req, res) => {
    var locationName = req.params.location;
    Place.findOne({locationName: locationName}).then(place => {
        res.json(place);
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};

// *** Update the record/item *** //
exports.update = (req, res) => {
    var _id = req.body._id;
    console.log( req.body);
    Place.updateOne({_id: _id}, { $set: req.body }).then(result => {
        res.json({msg: "Updated Successfully"});
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};

// *** Delete a location *** //
exports.delete = (req, res) => {
    var locationName = req.params.location;
    console.log(req.params);
    Place.deleteOne({'locationName': locationName}).then(result => {
        console.log(result);
        res.json({msg: "Deleted Successfully" });
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
};