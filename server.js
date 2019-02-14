// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

/**
 * The API code
 *
 */
// request with parameters
app.get('/api/timestamp/:date_string', function(req, res) {
  console.log('Query: ', req.params);

  let date_string = req.params.date_string;

  // Is it a valid UNIX timestamp?
  if (Number(date_string)) {
    return res.json({
      unix: Number(date_string),
      utc: new Date(Number(date_string)).toUTCString()
    });
    // If not..
  } else {
    let timestamp = new Date(date_string).getTime();

    return res.json({
      unix: isNaN(timestamp) ? null : timestamp,
      utc: new Date(date_string).toUTCString()
    });
  }
});

// request without parameters
app.get('/api/timestamp/', function(req, res) {
  const timestamp = new Date();
  res.json({
    unix: timestamp.getTime(),
    utc: timestamp.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
