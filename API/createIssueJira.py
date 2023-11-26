import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime
import psutil

repetir = True
while repetir:
  data = datetime.now()
  data = data.strftime('%Y/%m/%d %H:%M:%S')
  ram_percent = psutil.virtual_memory().percent
  user = [user[0] for user in psutil.users()]
  user = user[0]

  if (ram_percent >= 80):
    repetir = False
    mensagem = {"text": f"""
                🚨ALERTA🚨

                Protocolo  => 837021
                Data          => {data}
                User          => {user}
                Descrição  => {"Sua memória RAM ultrapassou:"} {ram_percent}%  
                """}
    chatItau = "https://hooks.slack.com/services/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"

    postMsg = requests.post(chatItau, data=json.dumps(mensagem))



    url = "https://banksecure.atlassian.net/rest/api/3/issue"

    auth = HTTPBasicAuth("suporte.banksecure@gmail.com", "ATATT3xFfGF047qQDbi2GlvIp8w8QrnhfnpUxSgS4GXkW3Y3eKYSN80T-maYdduxCywgW-xlfmS8kkzqbYKUp57whv7mDOLqQZzmhZDT9noqvGlXlcL6gOl1AnXTP81y9q8Iw7bdgJ0VJb7gIb953PuM9Sft-JVqOCWmBCeBLMzA-2zuEhLq-FM=A302DFA1")

    headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }

    payload = json.dumps({
        "fields":{
            "summary": "837021 - ALERTA DO SLACK",
            "project":{"key":"BSITAU"},
            'issuetype': {'name': 'General request'},
            "description": {"content": [{"content": [
                                          {
                                            "text": "CONFIRA SEUS ALERTAS!!!!",
                                            "type": "text"
                                          }],
                                        "type": "paragraph"}],
                                        "type": "doc",
                                        "version": 1}
          }
    })

    response = requests.request(
      "POST",
      url,
      data=payload,
      headers=headers,
      auth=auth
    )

    print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))