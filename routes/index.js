var models  = require('../models');
var express = require('express');
var router  = express.Router();
var { Event, Image } = models;

router.get('/test', function(req, res) {
  res.send({ status: 'ok', time: new Date() });
});

router.get('/', function(req, res) {
  res.redirect('/device/home');
});

router.get('/device/home', function(req, res) {
  
  //Retrieve active event
  Event.findOne({
    where: { active : true }
  }).then((event) => {
    res.render('device/home', { activeEvent: event });
  });

});

router.get('/device/event', function(req, res) {
  res.render('device/event');
});

router.get('/events/json', (req, res) => {
    Event.findAll().then(function (events){
        res.send(events);
    });
});

router.post('/events', (req, res) => {
  Event.create({ active: true }).then((event) => {
      res.send(event);
  })
});

router.post('/events/end', (req, res) => {
  Event.findOne({
    where: { active : true }
  }).then((event) => {
    if(event){
      event.active = false;
      event.updatedAt = new Date();
      event.save();
      res.send(event);
    } else {
      res.send(null);
    }
  })
});

router.post('/images', (req, res) => {

  //Retrieve active event
  Event.findOne({
    where: { active : true }
  }).then((event) => {

    if(!event){
      return res.send({status: 'error', message:  'No active event'});
    } else {

      let payload = {
        localPath: 'abc123',
        event_id: event.id
      }

      console.log(payload);
  
      Image.create(payload).then((newImage) => {
      
        res.send(newImage);
      
      });    
  
    }

  });

});


module.exports = router;
