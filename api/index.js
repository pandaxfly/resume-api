var express = require('express');
var router = express.Router();

const redis = require('redis');

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

client.on('error', err => {
  console.log('Error ' + err);
});

router.post('/send-message', (req, res) => {
  console.log(req.body);
  const requestBody = req.body;
  if (!requestBody.email) throw new Error("invalid email address");

  const userKey = `contact:${requestBody.email}`;

  client.hset(userKey, 
    'name', requestBody.name, 
    'email', requestBody.email, 
    'message', requestBody.message, 
    (err, reply) => {
      if (err) throw err;
      console.log(reply);
    });

  res.send('posted!');
})

module.exports = router;
