var express = require('express'),
    app = express();

function checkDate(req, res) {
  var datetime = req.params.date;
  if (isNaN(+datetime)) {
    datetime = new Date(datetime);
  } else {
    datetime = new Date(+datetime * 1000);
  }
  
  // translate month number to string
  var month = new Array(12);
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  
  var results = {
    unix: Math.floor(datetime.getTime() / 1000),
    natural: month[datetime.getMonth()] + " " + datetime.getDate() + ", " + datetime.getFullYear()
  };
  
  
  // handle the err
  if (isNaN(results.unix)) {
    res.send('Sorry! The data you typed in cannot be recognized.');
    return
  } else {
    res.json(results);
  }
}

function noInput(req, res) {
  var results = {
    unix: null, 
    natural: null
  };
  res.json(results);
}

app.get('/:date', checkDate);

app.get('/', noInput);

app.listen(process.env.Port || 8080, function() {
    console.log('Listening on port', this.address().port);
});
