import requests 
import json
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="user_bankSecure",
  password="urubu100",
  database="bankSecure"
)

mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM registros")
myresult = mycursor.fetchone()

print(myresult)

protocolo = ""
data = ""
agencia = ""
cnpj = ""
maquina = ""
descricao = ""

mensagem = {"text": f"""
    🚨ALERTA🚨

Protocolo  => {protocolo}
Data          => {data}
Agência     => {agencia}
CNPJ         => {cnpj}
Máquina    => {maquina}
Descrição  => {descricao}   
"""}
chatItau = "https://hooks.slack.com/services/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   "

postMsg = requests.post(chatItau, data=json.dumps(mensagem))
print(postMsg.status_code)