import requests
from requests.auth import HTTPBasicAuth
import json

url = "https://bank-secure.atlassian.net/rest/api/3/issue"

auth = HTTPBasicAuth("bruno.lima@sptech.school", "ATATT3xFfGF0S1Pwv5X3QhR22z2bQVg4SAGRrmyETO5iy2Tl-8XLJ-OTGaCchay9qbAZIdenl5Abu5wYXdQPek3z6lhxNqQulqHr6QSU-5FQVUsFuawCPn0-khG8nVBO-oqmjO7ywvorEQRaNqyUS_Kco0HzH-RfQ0xCI_nvVuU0FoQqB34Gaek=8268F9A8")

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}


payload = json.dumps({
    "fields":{
        "summary": "RESUMO DO TESTE",
        "project":{"key":"BSITAU"},
        'issuetype': {'name': 'Questions for analytics'},
        "description": {"content": [{"content": [
                                      {
                                        "text": "Order entry fails when selecting supplier.",
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