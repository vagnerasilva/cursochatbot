// server.js
// where your node app starts

// init project
var express = require('express');
const bodyParser = require('body-parser')

var app = express();


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// ROUTES TESTE 
app.get('/teste', function(req, res) {
	console.log(" ROTA de teste funcina huhuhuhuh Deu certo");
	res.send({
 				"messages": [
   								 {"text": "enviando msg facebook"}
									
 							]
			})
});

app.get('/chatfuel', function(req, res) {
    console.log("aqui fui chamado")
    console.log(req.query)
  
    let messageUser = req.query.msgtxt
    let nameUser = req.query.nomeuser
    let infouser = {};
  
   
    infouser.faceId = req.query.faceId
    infouser.messages = [];
    let pacote ={}
    
    let textopraentregar =
        {
 "messages": [
   {"text": "Seu pedido foi processado com sucesso"},
   {"text": "obrigado ate mais"}
 ]
}
  
  pacote=textopraentregar
  res.send(pacote)
  
    // res.send(
    //   {
    //     "messages": [{
    //         "text": "respondendo echo do usuario " + nameUser + " mensagem enviada: " + messageUser
    //     }]
    // }
    // )
});