import psutil
from datetime import datetime
import os
import mysql.connector
import requests 
import json
import platform
 
conexao = mysql.connector.connect(user='bs_itau', password='Itau_100', host='localhost', database='bankSecure')

cursor = conexao.cursor()

def pegar_dados():
  
    exibiu = False
    cont = 0

    while cont <= 1:
    
     data = datetime.now()
     data = data.strftime('%Y/%m/%d %H:%M:%S')

     user = [user[0] for user in psutil.users()]
     user = user[0]
     qtd_core = psutil.cpu_count(logical=False)

     cpu_porcent = psutil.cpu_percent(interval=1)
     cpu_speed = psutil.cpu_freq().current / pow(10,3)
     cpu_speed_max = psutil.cpu_freq().max / pow(10,3)

     ram_total = (psutil.virtual_memory().total) / pow(10,9)
     ram_used = (psutil.virtual_memory().used) / pow(10,9)
     ram_percent = psutil.virtual_memory().percent

     so = platform.system()

     if (so == 'Windows'):
         disc_total = psutil.disk_usage('C:\\').total / pow(10,9)
         disc_used = psutil.disk_usage('C:\\').used / pow(10,9)
         disc_percent = psutil.disk_usage('C:\\').percent
     elif (so == 'Linux'):
         disc_total = psutil.disk_usage('/bin').total / pow(10,9)
         disc_used = psutil.disk_usage('/bin').used / pow(10,9)
         disc_percent = psutil.disk_usage('/bin').percent
   
    # Alerta Slack
     if (exibiu == False):
         if (ram_percent > 83):
             mensagem = {"text": f"""
            🚨ALERTA🚨

            Protocolo  => 837021
            Data          => {data}
            User          => {user}
            Descrição  => {"Sua memória RAM ultrapassou:"} {ram_percent}%  
            """}
             chatItau = "https://hooks.slack.com/services/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"

             postMsg = requests.post(chatItau, data=json.dumps(mensagem))
             exibiu = True

     comp1 = "Memória"
     comp2 = "CPU"
     comp3 = "Disco"
     if (cont == 0):
         cursor.execute(f"CALL inserirDadosMaquina ('SI-1', '{comp1}', {ram_percent:.2f}, '{comp2}', {cpu_porcent}, '{comp3}', {disc_percent}, NOW());")
    
         cursor.execute(f"CALL inserirDadosMaquina ('MI-1', '{comp1}', {ram_percent:.2f}, '{comp2}', {cpu_porcent}, '{comp3}', {disc_percent}, NOW());")
     
         cursor.execute(f"CALL inserirDadosMaquina ('MI-2', '{comp1}', {ram_percent:.2f}, '{comp2}', {cpu_porcent}, '{comp3}', {disc_percent}, NOW());")
     
         cursor.execute(f"CALL inserirDadosMaquina ('MI-3', '{comp1}', {ram_percent:.2f}, '{comp2}', {cpu_porcent}, '{comp3}', {disc_percent}, NOW());")

     conexao.commit()
     cont+=1
 
if (conexao.is_connected()):
    print("A Conexão ao MySql foi iniciada ")
    pegar_dados()
else:
    print("Houve erro ao conectar")