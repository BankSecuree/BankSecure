import requests
from requests.auth import HTTPBasicAuth
import json

url = "https://banksecure.atlassian.net/rest/api/3/issue"

auth = HTTPBasicAuth("suporte.banksecure@gmail.com", "ATATT3xFfGF0Zw3miFtrfflrIf8eBXoJ6V9IgsWBTHGrulZXOeEdpqgFz5GN4jURHjZ0VZnXqWdrwYh-nJ4nN6CO00hhLLeWRxMuVEH1yjEM5UtHsRPbAEf0NOCKDR4X4clmIGP9C8ekXUefabGUhK4B8CFDnFVSKq8PkMjAL7pMiEOpjY2vvkA=CCC018D7")

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

payload = json.dumps({
    "fields":{
        "summary": "TESTE API JIRA",
        "project":{"key":"BSITAU"},
        'issuetype': {'name': 'General request'},
        "description": {"content": [{"content": [
                                      {
                                        "text": "A API está funcionando!!!!",
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