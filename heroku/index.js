const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important
const request = require("request");

app.get('/', function (req, res) {

	var options = { method: 'GET',
	  url: 'https://dephero-b04e.restdb.io/rest/utilisateur',
	  headers: 
	   { 'cache-control': 'no-cache',
	     'x-apikey': '4ee56fd28c586c7ce5e76b325264f34283e6a' } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  res.send(body);
	});
})

app.get('/', function (req, res) {
	var options = { method: 'POST',
	  url: 'https://dephero-b04e.restdb.io/rest/utilisateur',
	  headers: 
	   { 'cache-control': 'no-cache',
	     'x-apikey': '4ee56fd28c586c7ce5e76b325264f34283e6a',
	     'content-type': 'application/json' },
	  body: { field1: 'xyz', field2: 'abc' },
	  json: true };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(body);
	});
})



app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
