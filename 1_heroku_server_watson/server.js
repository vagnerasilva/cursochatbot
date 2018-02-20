require('dotenv').load();
const express         = require("express");
const bodyParser      = require('body-parser');
const ConversationV1  = require('watson-developer-cloud/conversation/v1');
const app             = express();





// INFO importante PRODUCAO AQUIII  direto do Arquivo .env
const PORT = process.env.PORT;
const username = process.env.CONVERSATION_USERNAME
const password = process.env.CONVERSATION_PASSWORD
const workspace_id = process.env.WORKSPACE_ID

// INFO importante PRODUCAO AQUIII  direto do Arquivo .env

console.log("###### PORTA QUE ESTOU ONLINE : " + PORT)



const version_date = ConversationV1.VERSION_DATE_2017_02_03
const conversation = new ConversationV1({ username, password, version_date });
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

let context = null;

app.get('/teste', function(req, res) {
	console.log("ROTA de teste funcina huhuhuhuh Deu certo");
	res.send({
 				"messages": [
   								 {"text": "enviando msg "}
 							]
			})
});

/// ##################### chatfuel TESTE !!!!! !!!!  
/// ##################### chatfuel TESTE !!!!! !!!! 
app.get('/chatfuel', function(req, res) {
  console.log("Teste API Chatfuel");
  console.log(req.query)

  let messageUser = req.query.messageText
  let nameUser = req.query.user

	res.send({
 				"messages": [
   								 {"text": "respondendo echo do usuario "+ nameUser+" mensagem enviada: " + messageUser}
 							]
			})
});

/// ##################### chatfuel TESTE !!!!! !!!!  
/// ##################### chatfuel TESTE !!!!! !!!! 

let cont= 0;
let usuarios= [];

/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
app.get('/chatfuelia', function(req, res) {
  console.log("Teste API Chatfuel");
  console.log(req.query)

  let messageUser = req.query.messageText
  let nameUser = req.query.user
  let infouser={};
  infouser.faceId=req.query.faceId
  infouser.messages =[];
  ///### tratamtento de usuarios, armazenar  e consultar no banco usando STORAGE
  if(usuarios.length==0){
    console.log("eu estava vazio"); // Primeira vez que entra
    usuarios.push(infouser);
    context = null;
  }else{  console.log("eu ja tenho usuarios ")
              let valid = false;
              for (let i in usuarios) {
               //   console.log(usuarios.faceID);
                 if (usuarios[i].faceId == infouser.faceId) {
                  console.log("atualizar conversa e counter");
                  console.log("chanel: "+usuarios[i].conversation_id)
                  console.log("contagem n: "+usuarios[i].dialog_turn_counter)
                  context = usuarios[i].context ;
                  valid= true;
                 }
              }
              if (!valid) {
                console.log("vou adicionar um novo usuario");
                usuarios.push(infouser);
                context = null;
              }
  }
///### tratamtento de usuarios, armazenar  e consultar no banco usando STORAGE
let message = { input: { text: req.query.messageText }, workspace_id, context }; // Montando pacote de envio para watson
let input = { text: req.query.messageText, workspace_id };

function callback (err, response) {
  if (err) {
    console.error(err);
    res.sendStatus(500);
  } else {
        console.log(response.intents)
        console.log(response.entities)
        console.log(response.output)
        console.log(response.context)

        infouser.context= response.context;
        infouser.conversation_id= response.context.conversation_id;
        infouser.dialog_turn_counter= response.context.system.dialog_turn_counter;
        infouser.messages.push({
          "output":response.output,
          "input":response.input,
          "dialog_turn_counter":response.context.system.dialog_turn_counter
        })
        let pacote={
                    messages: [
                                  {"text":  response.output.text[0]}
                            ]
                    }
        ;
        pacote.sender= infouser.faceId;
        cont++



        for (let i in usuarios) {
             if (usuarios[i].faceId == infouser.faceId) {
              console.log("atualizar usuario com a resposta final ");
              usuarios[i] = infouser;
             }
        }
    console.log(usuarios)    
    res.send(pacote);
  }// End sucess 
}// End Callback
conversation.message(message, callback);  // chamada do watson 




});
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  
/// ##################### chatfuel com INTELIGENCIA WATSON !!!!! !!!!  





//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////
app.post('/message', function (req, res) {
  let infouser={};
  infouser.faceId=req.body.senderId;

  console.log(infouser)


///### tratamtento de usuarios, armazenar  e consultar no banco usando STORAGE
    if(usuarios.length==0){
        console.log("eu estava vazio"); // Primeira vez que entra
        usuarios.push(infouser);
        context = null;
      }else{  console.log("eu ja tenho usuarios ")
                  let valid = false;
                  for (let i in usuarios) {
                   //   console.log(usuarios.faceID);
                     if (usuarios[i].faceId == infouser.faceId) {
                      console.log("atualizar conversa e counter");
                      console.log("chanel: "+usuarios[i].conversation_id)
                      console.log("contagem:"+usuarios[i].dialog_turn_counter)
                      context = usuarios[i].context ;
                      valid= true;
                     }
                  }
                  if (!valid) {
                    console.log("vou adicionar um novo usuario");
                    usuarios.push(infouser);
                    context = null;
                  }
      }
///### tratamtento de usuarios, armazenar  e consultar no banco usando STORAGE

  let message = { input: { text: req.body.messageTex }, workspace_id, context }; // Montando pacote de envio para watson
  let input = { text: req.body.messageTex, workspace_id };

  function callback (err, response) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      
          infouser.context= response.context;
          infouser.conversation_id= response.context.conversation_id;
          infouser.dialog_turn_counter= response.context.system.dialog_turn_counter;

          let pacote={};
          pacote.text=response.output.text ;
          pacote.action = response.output.action;
          pacote.sender= infouser.faceId;
          cont++;



          for (let i in usuarios) {
               if (usuarios[i].faceId == infouser.faceId) {
                console.log("atualizar usuario com a resposta final ");
                usuarios[i] = infouser;
               }
          }
      res.send(pacote);
    }// End sucess 
  }// End Callback
  conversation.message(message, callback);  // chamada do watson 
});
//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////
//################### resposta para o webhook do facebook  ##############/////

let port = process.env.PORT || 5000
app.listen(port, function () {
  console.log("SERVER ONLINEEEEE App started at: " + port);
});
