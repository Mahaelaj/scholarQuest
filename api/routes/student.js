var express = require('express');
var router = express.Router();
var bycrypt = require('bcryptjs');
var Student = require('../models/student');
var MathProbs = require('../models/math');
var Vocabulary = require('../models/vocabulary');
var Avatar = require('../models/avatar')
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var Cryptr = require('cryptr');

router.post('/signup', function (req, res, next) {
  var student = new Student({
    email: req.body.email,
    password: bycrypt.hashSync(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    coins: 0,
    cursor: 0,
    cursorFollower: 0,
    valiatedEmail: true
  });
  student.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    var avatar = new Avatar({
      userId: student._id,
      hair: '03',
      face: '02',
      eyes: '0304',
      nose: '02',
      mouth: '01',
      shirt: '0201',
      pants: '0301',
      shoes: '01',
      skin: '03'
    });
    avatar.save(function(err, result){
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sendWelcomeEmail(req.body.email);
      
      res.status(201).json({
          message: 'Saved user',
          obj: result
      });
    })
  });
});

 router.post('/getVocabulary', function(req, res, next){
    Vocabulary.find({grade: req.body.grade}, function(err, vocab){
      if (err) {
       return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if (!vocab) {
        return res.status(500).json({
          title: 'No vocab found',
          error: {message: 'Vocab not found'}
        });
      }
      res.status(200).json({
          vocab: vocab,
          message: 'vocab returned',
        });
    });
  });

  router.post('/getMath', function(req, res, next){
    
    MathProbs.find({grade: 1.0}, function(err, mathProbs){
      console.log(err);
      console.log(mathProbs);
      if (err) {
       res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if (!mathProbs) {
        res.status(500).json({
          title: 'No math problems found',
          error: {message: 'Math problems not found'}
        });
      }
      res.status(200).json({
          math: mathProbs,
          message: 'Math returned'
        });
    });
  });

router.post('/login', function(req, res, next){
    Student.findOne({email: req.body.email}, function(err, student){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      if(!student){
        return res.status(401).json({
          title: 'Login failed',
          error: {message: 'Invalid login credentials'}
        });
      }
      if(!bycrypt.compareSync(req.body.password, student.password)){
        return res.status(401).json({
          title: 'Login failed',
          error: {message: 'Invalid login credentials'}
        });
      }
      var token = jwt.sign({student: student}, 'gamez', {expiresIn: 7200});
      express.userId = student._id;
      res.status(200).json({
        message: 'Successfully logged in',
        token: token,
        userId: student._id,
        coins: student.coins,
        cursor: student.cursor,
        cursorFollower: student.cursorFollower
      });
    });
});

router.post('/verifyEmail', function(req, res, next){
    Student.update({email: getCryptr().decrypt(req.body.id)}, {$set: {valiatedEmail: true}}, function(err, student) {
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        status: 'success'
      });
    });
  });

router.post('/getStudent', function(req, res, next){

  Student.findById(express.userId, function(err, student) {
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!student){
      return res.status(500).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    res.status(200).json({
      message: 'Successfully logged in',
      userId: student._id,
      avatar: student.avatar,
      coins: student.coins,
      cursor: student.cursor,
      cursorFollower: student.cursorFollower
    });
  });
});

router.patch('/patchStudent', function(req, res, next){
  Student.findById(express.userId, function(err, student) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!student) {
      return res.status(500).json({
        title: 'No user found',
        error: {message: 'User not found'}
      });
    }
    else if(req.body.coins){
      student.coins = req.body.coins;
    }
    else if(req.body.cursor){
      student.cursor = req.body.cursor;
    }
    else if(req.body.cursorFollower) {
      student.cursorFollower = req.body.cursorFollower;
    }
    student.save(function(err, result){
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated user',
      });
    });
  });
});

function sendWelcomeEmail(email){
  try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: 'schquest@gmail.com',
                pass: 'Pewpew12!!'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
          
        let HelperOptions = {
            from: 'schquest@gmail.com',
            to: 'mahaelajohnson@gmail.com',
            subject: 'Welcome',
            text: 'Thank you for creating a ScholarQuest account! Follow this link to verify your account: https://scholar-quest.herokuapp.com/auth/verified/' + getCryptr().encrypt(email)
        };

        transporter.sendMail(HelperOptions, (error, info) => {
            if(error) {
                console.log(error);
            }
            else console.log("email sent");
        })
		}
		// email delivery failed
		catch (e) {
			console.log('Email Error: ', e);
		}
}

function getCryptr() {
  return new Cryptr('winkwink');
}

module.exports = router;
