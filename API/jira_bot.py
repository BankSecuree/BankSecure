import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime
import psutil
repetir = True
class issue_manipulation:
  def __init__(self, maquina: str, componente: str, porcentagem_uso: float, prioridade: int):
    self.maquina = maquina
    self.componente = componente
    self.porcentagem_uso = porcentagem_uso
    self.prioridade = prioridade
    self.url = 'https://banksecure.atlassian.net/rest/api/3/'
    self.auth = HTTPBasicAuth('suporte.banksecure@gmail.com', 'ATATT3xFfGF0OVDj2XBJchVqK5oAlkA8Ecyntm--fJBiKaGWEV7flX75vaaon8he5Hk5f8qfHpFmZpDNLqmUWSRuAgxmXlA4m-huvJUK5hfkyolNFsL0Lt8WE1RQ8KtcWTYQPzvtmH-bnDXuE6Di-jf23tGGCxAMxNCc5OgThtqnoCycmg7z7b8=F851C43C')
  def create_issue(self):
    url = self.url + "issue"
    mensagem_alerta = f'''Componente: {self.componente}\nPorcentagem de uso: {self.porcentagem_uso}'''
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    payload = json.dumps({
        'fields':{
            'summary': f'Alerta máquina {self.maquina}',
            'project':{'key':'BSITAU'},
            'issuetype': {'name': 'Task'},
            'priority': {'id': self.prioridade},
            'description': {'content': [{'content': [
                                          {
                                            'text': mensagem_alerta,
                                            'type': 'text'
                                          }],
                                        'type': 'paragraph'}],
                                        'type': 'doc',
                                        'version': 1}
          }
    })
    response = requests.request(
      'POST',
      url,
      data=payload,
      headers=headers,
      auth=self.auth
    )
    print(response.status_code)

  def get_issue(self):
    url = self.url + "search"
    headers = {
      "Accept": "application/json"
      }
    response = requests.request(
    "GET",
    url,
    headers=headers,
    auth=self.auth
    )
    for i in response.json()['issues']:
      try:
        # print(i["fields"]["description"]["content"][0]["content"][0]["text"])
        
        print(i["fields"]["status"]["name"])

        prioridade_alerta = int(i["fields"]["priority"]["id"])
        status_alerta = i["fields"]["status"]["name"]
        maquina_em_alerta = str.replace(i["fields"]["summary"], "Alerta máquina ", "")

        if(status_alerta != "Concluído" and prioridade_alerta > self.prioridade):
          problema.create_issue()

        valor_alerta = str.replace(i["fields"]["description"]["content"][0]["content"][0]["text"], f"Componente: {self.componente}\nPorcentagem de uso: ", "")
        print(maquina_em_alerta)
        print(float(valor_alerta))
        print("\n")
      except:
        pass
        # print(i["key"])
        # print(i["fields"]["description"])
        # print("\n")
    # print(response.json()['issues'])
    # print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))


problema = issue_manipulation('MI-1','CPU',19.8, 1)
problema.get_issue()
problema.create_issue()
# print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(',', ': ')))