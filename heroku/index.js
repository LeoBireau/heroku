const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important
const request = require("request");
const axios = require("axios");

app.get('/', function (req, res) {

	let configuration = {
		'cache-control': 'no-cache',
	    'x-apikey': '4ee56fd28c586c7ce5e76b325264f34283e6a',
	    'content-type': 'application/json' 
	};

	axios.get('https://dephero-b04e.restdb.io/rest/utilisateur', { headers: configuration } )
      .then(response => (res.send(response.data))).catch(console.log);

})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
