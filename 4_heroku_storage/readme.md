Servidor de conexao ao banco de dados

com api de Consulta em colecao de pizzas e listagem de conteudo

conexao com o mlab aulachatbot01

configuracao do banco no .env


utilizar robomongo para visualizar dados no mlab
https://robomongo.org/

Download
https://robomongo.org/download
<img src="https://robomongo.org/static/robomongo-128x128-129df2f1.png" class="robo-header__logo" width="128" height="128">



Exemplo de json para fazer post 


### colocar no Postman para o endereco da API
{
	"data":{
		"senderId":"12349",
		"cpf":"1231231231232",
		"profile":{},
		"cadastro":  {},
		"pedidos":{
			"numero":"numero do pedido",
			"descricao":"descricao 2",
			"endereco":"endereco"
		},
		"messages": {
			"msg":"testando mensagem"
		}
	}
}