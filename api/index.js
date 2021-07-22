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

// const cors= require('cors');
// var corsOptions = {
//   origin: 'http://resume.yuehao.s3-website-ap-southeast-1.amazonaws.com',
//   methods: 'POST',
//   optionsSuccessStatus: 200 //(IE11, various SmartTVs) choke on 204
// }

router.options('/send-message', cors(corsOptions));
router.post('/send-message', cors(corsOptions), (req, res) => {
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

  res.set('Access-Control-Request-Headers', 'Content-Type');

  res.send('posted!');
})

module.exports = router;
