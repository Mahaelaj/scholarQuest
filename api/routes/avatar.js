var express = require('express');
var router = express.Router();
var bycrypt = require('bcryptjs');
var Avatar = require('../models/avatar');

router.post('/getAvatar', function(req, res, next){

  var query = Avatar.findOne({'userId': express.userId});
  query.select('hair face eyes nose mouth shirt pants shoes')

  query.exec(function (err, result) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    res.status(200).json({
        message: 'Success',
        obj: result
    });
  });
});

router.patch('/patchAvatar', function(req, res, next){
  Avatar.findOneAndUpdate({'userId': express.userId}, {$set: req.body}, function(err, avatar) {

     if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }

     res.status(200).json({
        message: 'Updated Avatar',
      });
  });
});

router.post('/getSkinColor', function(req, res, next){
  var query = Avatar.findOne({'userId': express.userId});
  query.select('skin')

  query.exec(function (err, avatar) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    else if (!avatar) {
      return res.status(200).json({
        status: 'Success',
        skin: '03'
      });
    }
    res.status(200).json({
      status: 'Success',
        skin: avatar.skin
    });
  });
  });

module.exports = router;
