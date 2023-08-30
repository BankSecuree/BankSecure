import requests
from requests.auth import HTTPBasicAuth
import json

url = "https://bank-secure.atlassian.net/rest/api/3/issue"

auth = HTTPBasicAuth("bruno.lima@sptech.school", "ATATT3xFfGF02hPlP9ZKwfS3oc9MWJDOIxbiI1nuAAz8qDt_Dfn6wD2ywUygoXsv2O0VvHIPwpWNMyyO1SP52qAFesum43ALN93qfPFlDKuABECJxd2H4aGqxUyycQKXEkd6gbx4hrnG0gvwB-7jfJNonAV5BdDVDqHS0zipoDL0HKZwWTdMqtQ=F70C5CF6")

headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}


payload = json.dumps( {
    "fields":{
        "summary": "RESUMO DO TESTE",
        "issuetype":{"name": "Bug"},
        "project":{"key":"BSITAU"},
        'issuetype': {'name': 'Questions for analytics'}
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