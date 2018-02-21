require('dotenv').load();
const express = require("express");
const bodyParser = require('body-parser');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const app = express();
const PORT = process.env.PORT;
const username = process.env.CONVERSATION_USERNAME
const password = process.env.CONVERSATION_PASSWORD
const workspace_id = process.env.WORKSPACE_ID
const version_date = ConversationV1.VERSION_DATE_2017_02_03
const conversation = new ConversationV1({
    username,
    password,
    version_date
});
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

let context = null;

app.get('/teste', function(req, res) {
    res.send({
        "messages": [{
            "text": "enviando msg "
        }]
    })
});

app.get('/chatfuel', function(req, res) {

    let messageUser = req.query.messageText
    let nameUser = req.query.user
    res.send({
        "messages": [{
            "text": "respondendo echo do usuario " + nameUser + " mensagem enviada: " + messageUser
        }]
    })
});

let cont = 0;
let users = [];

/// Chatfuel com INTELIGENCIA WATSON  
app.get('/chatfuelia', function(req, res) {
    let messageUser = req.query.messageText
    let nameUser = req.query.user
    let infouser = {};
    infouser.faceId = req.query.faceId
    infouser.messages = [];
    if (users.length == 0) {
        console.log("eu estava vazio"); // Primeira vez que entra
        users.push(infouser);
        context = null;
    } else {
        console.log("eu ja tenho users ")
        let valid = false;
        for (let i in users) {
            if (users[i].faceId == infouser.faceId) {
                context = users[i].context;
                valid = true;
            }
        }
        if (!valid) {
            users.push(infouser);
            context = null;
        }
    }
    ///Tratamento de usuário
    let message = {
        input: {
            text: req.query.messageText
        },
        workspace_id,
        context
    }; // Montando pacote de envio para watson
    let input = {
        text: req.query.messageText,
        workspace_id
    };

    function callback(err, response) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            infouser.context = response.context;
            infouser.conversation_id = response.context.conversation_id;
            infouser.dialog_turn_counter = response.context.system.dialog_turn_counter;
            infouser.messages.push({
                "output": response.output,
                "input": response.input,
                "dialog_turn_counter": response.context.system.dialog_turn_counter
            })
            let pacote = {
                messages: [{
                    "text": response.output.text[0]
                }]
            };
            pacote.sender = infouser.faceId;
            cont++
            for (let i in users) {
                if (users[i].faceId == infouser.faceId) {
                    console.log("atualizar usuario com a resposta final ");
                    users[i] = infouser;
                }
            }
            console.log(users)
            res.send(pacote);
        } // End sucess 
    } // End Callback
    conversation.message(message, callback); // chamada do watson 

});

// Resposta para o webhook do facebook
app.post('/message', function(req, res) {
    let infouser = {};
    infouser.faceId = req.body.senderId;
    // Tratamento de usuário  
    if (users.length == 0) {
        users.push(infouser);
        context = null;
    } else {
        let valid = false;
        for (let i in users) {
            //   console.log(users.faceID);
            if (users[i].faceId == infouser.faceId) {
               context = users[i].context;
                valid = true;
            }
        }
        if (!valid) {
            users.push(infouser);
            context = null;
        }
    }

    let message = {
        input: {
            text: req.body.messageTex
        },
        workspace_id,
        context
    }; // Montando pacote de envio para watson
    let input = {
        text: req.body.messageTex,
        workspace_id
    };

    function callback(err, response) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            infouser.context = response.context;
            infouser.conversation_id = response.context.conversation_id;
            infouser.dialog_turn_counter = response.context.system.dialog_turn_counter;

            let pacote = {};
            pacote.text = response.output.text;
            pacote.action = response.output.action;
            pacote.sender = infouser.faceId;
            cont++;

            for (let i in users) {
                if (users[i].faceId == infouser.faceId) {
                    users[i] = infouser;
                }
            }
            res.send(pacote);
        } // End sucess 
    } // End Callback
    conversation.message(message, callback); // chamada do watson 
});

/** 
 * Facebook response 
 */
let port = process.env.PORT || 5000
app.listen(port, function() {
    console.log("Server works in port: " + port);
});
