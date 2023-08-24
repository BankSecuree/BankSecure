import requests 
import json

mensagem = {"text":"Ola, Itaú!"}
chatItau = "https://hooks.slack.com/services/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"

postMsg = requests.post(chatItau, data=json.dumps(mensagem))
print(postMsg.status_code)