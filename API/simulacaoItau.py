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

    while cont <= 4:
    
     data = datetime.now()
     data = data.strftime('%Y/%m/%d %H:%M:%S')

     user = [user[0] for user in psutil.users()]
     user = user[0]
     qtd_core = psutil.cpu_count(logical=False)

     cpu_porcent = psutil.cpu_percent(interval=1)
     cpu_speed = psutil.cpu_freq().current / pow(10,3)
     cpu_speed_max = psutil.cpu_freq().max / pow(10,3)

     so = platform.system()
     processor = platform.processor()

     if (so == 'Windows'):
    # DIRETÓRIO PARA WINDOWS

         disc_total = psutil.disk_usage('C:\\').total / pow(10,9)
         disc_used = psutil.disk_usage('C:\\').used / pow(10,9)
         disc_percent = psutil.disk_usage('C:\\').percent
     elif (so == 'Linux'):
    # DIRETÓRIO PARA LINUX
         disc_total = psutil.disk_usage('/bin').total / pow(10,9)
         disc_used = psutil.disk_usage('/bin').used / pow(10,9)
         disc_percent = psutil.disk_usage('/bin').percent

     ram_total = (psutil.virtual_memory().total) / pow(10,9)
     ram_used = (psutil.virtual_memory().used) / pow(10,9)
     ram_percent = psutil.virtual_memory().percent

     msgOpen = f"""
    
     Bank Secure Monitor Report               {data}     
                                                                 
     USER  ==> {user}                                                               
     SO ==> {so}                         
     COREs ==> {qtd_core}        

    
     #          ==>     PORCENT     |      SPEED     |   MAX SPEED    |
     CPU        ==>     {cpu_porcent:.1f}%     |    {cpu_speed:.2f}GHz     |   {cpu_speed_max:.2f}GHz |
    
     #          ==>     PORCENT     |      TOTAL     |      USED      |
     DISC (GB)  ==>     {disc_percent:.1f}%     |     {disc_total:.1f}     |    {disc_used:.1f}       |
     RAM  (GB)  ==>     {ram_percent:.1f}%     |     {ram_total:.1f}       |    {ram_used:.1f}        |
   
    """
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
     cursor.execute(f"CALL inserirDadosMaquina ('{user}', '{comp1}', {ram_percent:.2f}, '{comp2}', {cpu_porcent}, '{comp3}', {disc_percent}, NOW());")

    #Gravar os dados na tabela definitiva
     conexao.commit()
    #  print(msgOpen)
    

if (conexao.is_connected()):
    print("A Conexão ao MySql foi iniciada ")
    pegar_dados()
else:
    print("Houve erro ao conectar")