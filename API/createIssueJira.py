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
                User          => ${user}
                Descrição  => {"Sua memória RAM ultrapassou:"} {ram_percent}%  
                """}
    chatItau = "https://hooks.slack.com/services/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"

    postMsg = requests.post(chatItau, data=json.dumps(mensagem))



    url = "https://banksecure.atlassian.net/rest/api/3/issue"

    auth = HTTPBasicAuth("suporte.banksecure@gmail.com", "ATATT3xFfGF08LobAfSeXkqk1KRpSciYfZiZivdvAznaP8Xxby91xg9uNlg7VbJa6JYpWigvebjO9qvCvCjrh7eDV_Nhctmt-m9-oknCJl60EFEGS_NEn-17qzJl2L8MNvALO0a5veSRE5kN2q8mNTmfT7w3-MUsiVa9a-PmFxe9NJwswQZCpKw=EE3CC2AE")

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