import requests
from requests.auth import HTTPBasicAuth
import json

url = "https://banksecure.atlassian.net/rest/api/3/issue"

auth = HTTPBasicAuth("suporte.banksecure@gmail.com", "ATATT3xFfGF0TY7WvTgqpW5R9DIp048nQsbeGDwgD1d1JZb2K0HTtsg_yLZBPveoCvdDTBgFyzTduecMwA6lVMU-6t7d6ARhMAkNTXRww2SbcOgKZjWiyFHpFuErB32pKdztM2E0BgHG0N0Q9QriPaoNVX8ixtPwUzouu5Sc7EvIUUPky33N4-4=5768639E")

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

payload = json.dumps({
    "fields":{
        "summary": "ALERTA DO SLACK",
        "project":{"key":"BSB"},
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