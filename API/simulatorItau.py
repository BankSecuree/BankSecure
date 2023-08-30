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

     cpu_um = psutil.cpu_percent(interval=1)
     cpu_um_speed = psutil.cpu_freq().current / pow(10,3)
     cpu_um_speed_max = psutil.cpu_freq().max / pow(10,3)

     ram_um_total = (psutil.virtual_memory().total) / pow(10,9)
     ram_um_used = (psutil.virtual_memory().used) / pow(10,9)
     ram_um = psutil.virtual_memory().percent

     so = platform.system()

     if (so == 'Windows'):
         disco_um_total = psutil.disk_usage('C:\\').total / pow(10,9)
         disco_um_used = psutil.disk_usage('C:\\').used / pow(10,9)
         disco_um = psutil.disk_usage('C:\\').percent
     elif (so == 'Linux'):
         disco_um_total = psutil.disk_usage('/bin').total / pow(10,9)
         disco_um_used = psutil.disk_usage('/bin').used / pow(10,9)
         disco_um = psutil.disk_usage('/bin').percent
   
     comp1 = "Memória"
     comp2 = "CPU"
     comp3 = "Disco"
     if (cont == 0):
         cursor.execute(f"CALL inserirDadosMaquina ('MI-1', '{comp1}', {ram_um:.1f}, '{comp2}', {cpu_um}, '{comp3}', {disco_um}, NOW());")
         cursor.execute(f"CALL inserirDadosMaquina ('MI-2', '{comp1}', {(ram_um*1.15):.1f}, '{comp2}', {(cpu_um*1.1):.1f}, '{comp3}', {(disco_um*1.05):.1f}, NOW());")
         cursor.execute(f"CALL inserirDadosMaquina ('MI-3', '{comp1}', {(ram_um*1.05):.1f}, '{comp2}', {(cpu_um*1.05):.1f}, '{comp3}', {(disco_um*(1/3)):.1f}, NOW());")
     
     conexao.commit()
     cont+=1
 
if (conexao.is_connected()):
    print("A Conexão ao MySql foi iniciada ")
    pegar_dados()
else:
    print("Houve erro ao conectar")