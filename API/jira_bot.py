import requests
from requests.auth import HTTPBasicAuth
import json
import os
from dotenv import load_dotenv

load_dotenv()
jira_api_token = os.environ.get('JIRA_TOKEN')
print(jira_api_token)
class create_issue  :
    def __init__(
        self, maquina: str, componente: str, porcentagem_uso: float, prioridade: int
    ):
        self.maquina = maquina
        self.componente = componente
        self.porcentagem_uso = porcentagem_uso
        self.prioridade = str(prioridade)
        self.url = "https://banksecure.atlassian.net/rest/api/3"
        self.auth = HTTPBasicAuth(
            "suporte.banksecure@gmail.com",
            "ATATT3xFfGF0pvKfx5G_GNvHurEn8sU7cZWpe-NyahA9sj8lqKQAI4wmrZvEXSMrzxsh5CghwZj_uuKStqELhCbwoE6UyZJ_TpasIcPVdx9vKsxU7pGPK9nMt-jTAj3axZz6c7OutDeD0cOGo1ehA_nyCbnviQiWZo_irZKW4HGdBnom1CuDeJE=EDFC2137",
            jira_api_token
        )
        self.__verify_issue()

    def __post_issue(self):
        url = f'{self.url}/issue'
        mensagem_alerta = f"""Componente: {self.componente}\nPorcentagem de uso: {self.porcentagem_uso}"""
        headers = {"Accept": "application/json", "Content-Type": "application/json"}
        payload = json.dumps(
            {
                "fields": {
                    "summary": f"Alerta máquina {self.maquina}",
                    "project": {"key": "BSITAU"},
                    "issuetype": {"name": "Task"},
                    "priority": {"id": self.prioridade},
                    "description": {
                        "content": [
                            {
                                "content": [{"text": mensagem_alerta, "type": "text"}],
                                "type": "paragraph",
                            }
                        ],
                        "type": "doc",
                        "version": 1,
                    },
                }
            }
        )

        response = requests.request(
            "POST", url, data=payload, headers=headers, auth=self.auth
        )

    def __update_issue(self, issueKey: str):
        url = f"{self.url}/issue/{issueKey}"
        headers = {"Accept": "application/json", "Content-Type": "application/json"}

        mensagem_alerta = f"""Componente: {self.componente}\nPorcentagem de uso: {self.porcentagem_uso}"""
        headers = {"Accept": "application/json", "Content-Type": "application/json"}
        payload = json.dumps(
            {
                "fields": {
                    "summary": f"Alerta máquina {self.maquina}",
                    "project": {"key": "BSITAU"},
                    "issuetype": {"name": "Task"},
                    "priority": {"id": self.prioridade},
                    "description": {
                        "content": [
                            {
                                "content": [{"text": mensagem_alerta, "type": "text"}],
                                "type": "paragraph",
                            }
                        ],
                        "type": "doc",
                        "version": 1,
                    },
                }
            }
        )
        response = requests.request(
            "PUT", url, data=payload, headers=headers, auth=self.auth
        )

    def __verify_issue(self):
        url = f'{self.url}/search'
        headers = {"Accept": "application/json"}
        response = requests.request("GET", url, headers=headers, auth=self.auth)
        chamados = []
        for i in response.json()["issues"]:
            status_alerta = i["fields"]["status"]["name"]
            maquina_em_alerta = str.replace(
                i["fields"]["summary"], "Alerta máquina ", ""
            )
            if status_alerta != "Concluído" and maquina_em_alerta == self.maquina:
                chamados.append(i)
        if len(chamados) == 0:
            self.__post_issue()
        else:
            for i in chamados:
                id = i["id"]
                prioridade_alerta = int(i["fields"]["priority"]["id"])
                if prioridade_alerta > int(self.prioridade):
                    self.__update_issue(id)
                    status_alerta = i["fields"]["status"]["name"]
                    break
