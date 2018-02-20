
require('dotenv').load();
const express    = require('express')
const bodyParser = require('body-parser')
const request    = require('request')
const rp         = require('request-promise');
const app        = express()

// ### Dados  Importantes Configurar para producao
const PORT 		= process.env.PORT;
const tokenChek = process.env.FB_VERIFY_TOKEN;
const tokenFB   = process.env.FB_ACCESS_TOKEN;
// ### Dados  Importantes Configurar para producao
app.use('/', express.static('public'));
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(app.get('port'), function() {
	console.log("logado olha o log !! aquiiiiiiiiiiiiii  TO ONLINEEEE " + PORT)
})




// ROUTES
app.get('/teste', function(req, res) {
	console.log("huhuhuuhu Deu certo  o teste");
	res.send({
 				"messages": [
   								 {"text": "enviando msg facebook"}
									
 							]
			})
});

