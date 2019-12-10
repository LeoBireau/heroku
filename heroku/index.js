
const request = require("request");

var options = { method: 'GET',
  url: 'https://dephero-b04e.restdb.io/rest/users',
  headers: 
   { 'cache-control': 'no-cache',
     'x-apikey': '4ee56fd28c586c7ce5e76b325264f34283e6a' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});