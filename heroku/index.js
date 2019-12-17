const express = require('express')
const request = require("request")
const axios = require("axios")
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}
const configuration = {
        'cache-control': 'no-cache',
        'x-apikey': '4ee56fd28c586c7ce5e76b325264f34283e6a',
        'content-type': 'application/json',
        'ObjectID' : '5df8db1291eb7c5a0001196b' 
}
const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, next) {
  const user = users.find(user => user.email === payload.user)
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})

passport.use(jwtStrategy)

app.get('/pw', function (req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("holla", salt, function(err, hash) {
               bcrypt.compare("holla", hash, function(err, resp) {
                   res.send(resp)
            });
        });
    });
})

//Partie Utilisateur ***************************************************************************

app.get('/getAllUsers', function (req, res) {
    axios.get('https://dephero-b04e.restdb.io/rest/utilisateur', { headers: configuration } )
      .then(response => (res.send(response.data))).catch(console.log)
})

app.get("/addUsers", function (req, res) {
    axios({
        "method": "POST",
        "url": "https://dephero-b04e.restdb.io/rest/utilisateur",
        "headers": configuration,
        "data": { 
            "nomUser": 'xyz',
            "prenomUser": 'abc',
            "emailUser": 'lemoinelucas1@gmail.com',
            "passwordUser": 'abc'
        },
          "responseType": 'json'
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        res.send(error);
    })
})

//Partie Articles *************************************************************************

//Testé et Approuvé
app.get('/getAllAticles', function (req, res) {
    axios.get('https://dephero-b04e.restdb.io/rest/articles', { headers: configuration } )
      .then(response => (res.send(response.data))).catch(console.log)
})

//Testé et Approuvé
app.get('/getArticleById/:idarticle', function (req, res) {
    axios.get('https://dephero-b04e.restdb.io/rest/articles/'+req.params.idarticle, { headers: configuration } )
      .then(response => (res.send(response.data))).catch(console.log)
})

//Testé et Approuvé
app.get("/addArticle", function (req, res) {
    axios({
        "method": "POST",
        "url": "https://dephero-b04e.restdb.io/rest/articles",
        "headers": configuration,
        "data": { 
            "titre": 'Konosuba',
            "contenu": 'Konosuba Kurenai',
            "auteur": '5df8db1291eb7c5a0001196b'
        },
          "responseType": 'json'
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        res.send(error);
    })
})

//Testé et Approuvé
app.get("/editArticle/:idarticle", function (req, res) {
    console.log(req);
    axios({
        "method": "PUT",
        "url": "https://dephero-b04e.restdb.io/rest/articles/"+req.params.idarticle,
        "headers": configuration,
        "data": { 
            "titre": 'holla',
            "contenu": 'holla Kurenai',
            "auteur": 'holla'
        },
          "responseType": 'json'
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        res.send(error);
    })
})

//Testé et Approuvé
app.get("/dropArticle/:idarticle", function (req, res) {
    console.log(req);
    axios({
        "method": "DELETE",
        "url": "https://dephero-b04e.restdb.io/rest/articles/"+req.params.idarticle,
        "headers": configuration
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        res.send(error);
    })
})

//Partie Controller

app.get("/createArticle", function (req, res) {
    res.sendFile(__dirname+"/ressources/formArticle.html");
})


//Partie écouteur

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})

