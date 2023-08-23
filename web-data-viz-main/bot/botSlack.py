import requests 
import json

mensagem = { "texto": "Olá, Itaú"}
chatItau = "https://hooks.slack.com/services/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"

requests.post(chatItau, data=json.dumps(mensagem))