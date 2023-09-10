import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime

data = datetime.now()
data = data.strftime('%Y/%m/%d %H:%M:%S')

mensagem = {"text": f"""
            🚨ALERTA🚨

            Protocolo  => 837021
            Data          => {data}
            User          => Máquina X
            Descrição  => {"Sua memória RAM ultrapassou:"} XX%  
            """}
chatItau = "https://hooks.slack.com/services/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"

postMsg = requests.post(chatItau, data=json.dumps(mensagem))



url = "https://banksecure.atlassian.net/rest/api/3/issue"

auth = HTTPBasicAuth("suporte.banksecure@gmail.com", "ATATT3xFfGF0h03C81f-lcuaJpPPNBlhmUIEsl0ceC9eQAEKS0mLypJmI1reJf2MX6jSsIhltcuvbOIdXFMJIoBKLHBrmuZcqouHo-6HJTlXt33ACtMs_KU2mX_7YLSpe3h1-hsI3QTUmjM2euTKjTuybLXQKDU_WYw_CdBSjvuaLUPUJFHvZTI=D00309ED")

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