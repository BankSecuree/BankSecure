import requests 
import json

mensagem = {"text":"Ola, Paulo!"}
chatItau = "https://hooks.slack.com/services/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"

postMsg = requests.post(chatItau, data=json.dumps(mensagem))
# print(postMsg.status_code)