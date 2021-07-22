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
  const requestBody = req.body;

  if (!requestBody.email) throw new Error("invalid email address");
  const userKey = `contact:${requestBody.email}`;
  const kvArray = [
    'name', requestBody.name, 
    'email', requestBody.email, 
    'message', requestBody.message
  ];

  client.exists(userKey, (err, reply)=> {
    if (err) throw err;
    if (!reply) {
      kvArray.push(
        'dateCreated', new Date().toISOString(),
        'createdBy', 'FRONTEND'
      )
    } else {
      kvArray.push(
        'dateUpdated', new Date().toISOString(),
        'updatedBy', 'FRONTEND',
      )
    }

    client.hset(userKey, kvArray, (err, reply) => {
      if (err) throw err;
      console.log(`updated ${reply} items`);
    });
    res.send('SUCCESS');
  });
  
})

module.exports = router;
