var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var fl = require('first-line')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Create Net Dashboard' });
});

router.post('/csv-upload', function(req, res, next) {
	var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.csv.path;
    var newpath = 'public/user-data/' + files.csv.name;
    var csv = files.csv;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      fs.readFile(newpath, function read(err, data) {
        if (err) {
          throw err;
        }
        fl(newpath, function(error, line) {
          if (error) {
            throw error;
          }
          console.log(line.toString());
          header_split = line.toString().split(",")
          json = [];
          for (var i = 0; i < header_split.length; i++) {
            json.push(header_split[i]);
          }
          res.writeHead(200, {"Content-Type": "application/json"});
          res.write(JSON.stringify(json));
          res.end();
        });
      });
    });
  });
});

module.exports = router;
