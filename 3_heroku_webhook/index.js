require('dotenv').load();
const express    = require('express')
const bodyParser = require('body-parser')
const request    = require('request')
const watson     = require('watson-developer-cloud');

// ### Dados  Importantes Configurar para producao
const PORT 		= process.env.PORT;
const tokenChek = process.env.FB_VERIFY_TOKEN;
const tokenFB   = process.env.FB_ACCESS_TOKEN;
// ### Dados  Importantes Configurar para producao

const app = express()

const rp = require('request-promise');
app.use('/', express.static('public'));
app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(app.get('port'), function() {
	console.log("logado olha o log !! aquiiiiiiiiiiiiii  TO ONLINEEEE " + PORT)
})




// ##### TOKEN DA PAGINA facebook

let token = "EAAByKZC3c3R0BANGg0HBG6BIn17CnaO57sX0FLc7rogv0PSKslhoDvWE54oZBjvDC1tvPktY9Tv5RaHETCdXZAVfTsGm8LZAD4ZC0foyQsBAEZCXsdblbTQ12mF0pNMVDZA0RahqCFphb20JAJZA8oAwGGJYZCZCCYIQZAJyRVpbWH8KAZDZD"

// Facebook 
let timeMessage= {};
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "vagnertoken") {  //#### Token webhook
		console.log("webhook")
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})


app.post('/webhook/',function(req, res){
	
	let data = req.body
///	console.log(data.entry[0].time);  // Time 
	timeMessage = data.entry[0].time;
	if(data.object == 'page'){
		
		data.entry.forEach(function(pageEntry){
			pageEntry.messaging.forEach(function(messagingEvent){
				if(messagingEvent.message){					
					getMessage(messagingEvent)
				//	somenteTexto(senderID, "chamei")
				}
			})
		})
	}
	res.sendStatus(200)
})




function getMessage(event){
	let senderID = event.sender.id
	let messageText = event.message.text
	
//	console.log(messatime)
   console.log("pegando a mensagem")
	avaliarmsg(senderID, messageText)   // Avalia mensagem pelo texto que chega
										// tem opcao de avaliar pelo tipo de evento
}




function avaliarmsg(senderID, messageText){
	console.log("chamando ask msg")
		
	//	somenteTexto(senderID, "chamei")
		//servidorAsk(senderID,  messageText); /// ### ESSA parte vai perguntar pro servidor de IA o que ele entendeu e pega a resposta
		somenteTexto(senderID, messageText)   /// ### Devolvendo ECHO da mensagem enviada para o webhook
}// Fim da function


let cont= 0;
function servidorAsk(senderID, messageTex){

rp({
    method: 'POST',
    uri: 'https://serverwatson01.herokuapp.com/send',
	headers: 
		   { 'Content-Type': 'application/json' },
    body: {
        senderID : senderID,
        messageTex : messageTex
    },
    json: true // Automatically stringifies the body to JSON
}).then(function (parsedBody) {
        console.log(parsedBody);
        // POST succeeded...
       let msg = parsedBody.text[0];
       let pacote1 = parsedBody.sender;
       console.log(msg);
       console.log(pacote1);
      // context = parsedBody.output.text;
       //senderID= parsedBody.username;
      //  console.log(context);

        cont++;
        console.log("#################contador")
        console.log(cont)
		somenteTexto(senderID, msg)   // somente Texto como resposta
		// callSendAPI(messageData)  chamada da entrega Card e texto ja personalizado
    })
    .catch(function (err) {
       // console.log(parsedBody);
      // console.log(err);
        console.log("deu ruim")
        somenteTexto(senderID, "deu ruim")
        // POST failed...
    });


}  // Funcao que chama No Servidor 




function somenteTexto(senderID, msg){
	let messageData = {
		recipient : {
			id: senderID
		},
		message: {
			text: "Echo da sua msg aqui ó : " + msg
		}
	}
	callSendAPI(messageData)
}



// ROUTES TESTE 
app.get('/teste', function(req, res) {
	console.log(" ROTA de teste funcina huhuhuhuh Deu certo");
	res.send({
 				"messages": [
   								 {"text": "enviando msg facebook"}
									
 							]
			})
});


function callSendAPI(messageData){
	//api de facebook
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},  /// # utiliza o token da Facepage aqui 
		method: 'POST',
		json: messageData       /// # faz um post com o pacote criado nas funcoes 
	},function(error, response, data){
		if(error)
			console.log('Shiii deu ruim nao deu pra mandar')
		else
			console.log('huhuhuuhu Deu certo ')
	})
}

