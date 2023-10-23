import psutil
from datetime import datetime
import os
import mysql.connector
import requests 
import json
import platform
import time
 
conexao = mysql.connector.connect(user='bs_itau', password='Itau_100', host='localhost', database='bankSecure')

cursor = conexao.cursor()

cont = 0

def rudge_ramos():
    global problema
    problema = 0
    
    qtd_core = psutil.cpu_count(logical=False)
    cpu_um_speed_max = psutil.cpu_freq().max / pow(10,3)
    ram_um_total = (psutil.virtual_memory().total) / pow(10,9)
    so = platform.system()
    if (so == 'Windows'):
        disco_um_total = psutil.disk_usage('C:\\').total / pow(10,9)
    elif (so == 'Linux'):
        disco_um_total = psutil.disk_usage('/bin').total / pow(10,9)

    testes = True

    while (testes):
        data = datetime.now()
        data = data.strftime('%Y/%m/%d %H:%M:%S')
        cpu_m1 = psutil.cpu_percent(interval=1)
        cpu_m1_speed = psutil.cpu_freq().current / pow(10,3)
        ram_m1_used = (psutil.virtual_memory().used) / pow(10,9)
        ram_m1 = psutil.virtual_memory().percent
        if (so == 'Windows'):
            disco_m1 = psutil.disk_usage('C:\\').percent
        elif (so == 'Linux'):
            disco_m1 = psutil.disk_usage('/bin').percent
            
        cpu_s1 = cpu_m1 * 1.15
        cpu_s1 = 100 if cpu_s1 >= 100 else cpu_s1
        ram_s1 = ram_m1
        ram_s1 = 100 if ram_s1 >= 100 else ram_s1
        disco_s1 = disco_m1 * 1.2
        disco_s1 = 100 if disco_s1 >= 100 else disco_s1

        ram_m1 = ram_m1 * 0.90
        ram_m1 = 0 if ram_m1 <= 0 else ram_m1
        
        cpu_m2 = cpu_m1 * 1.05
        cpu_m2 = 100 if cpu_m2 >= 100 else cpu_m2
        ram_m2 = ram_m1 * 0.875
        ram_m2 = 0 if ram_m2 <= 0 else ram_m2
        disco_m2 = disco_m1 * 1.05
        disco_m2 = 100 if disco_m2 >= 100 else disco_m2

        cpu_m3 = cpu_m1 * 0.95
        cpu_m3 = 0 if cpu_m3 <= 0 else cpu_m3
        ram_m3 = ram_m1 * 0.85
        cpu_m3 = 0 if cpu_m3 <= 0 else cpu_m3
        disco_m3 = disco_m1 * 0.95
        disco_m3 = 0 if disco_m3 <= 0 else disco_m3

        if(problema >= 5):
            cpu_m1 = 70
            print(cpu_m1)

        cursor.execute(f"CALL inserirDadosMaquina ('MI-1', 'Memória', {ram_m1:.1f}, 'CPU', {cpu_m1:.1f}, 'Disco', {disco_m1:.1f}, NOW());")
        cursor.execute(f"CALL inserirDadosMaquina ('MI-2', 'Memória', {ram_m2:.1f}, 'CPU', {cpu_m2:.1f}, 'Disco', {disco_m2:.1f}, NOW());")
        cursor.execute(f"CALL inserirDadosMaquina ('MI-3', 'Memória', {ram_m3:.1f}, 'CPU', {cpu_m3:.1f}, 'Disco', {disco_m3:.1f}, NOW());")
        cursor.execute(f"CALL inserirDadosMaquina ('SI-1', 'Memória', {ram_s1:.1f}, 'CPU', {cpu_s1:.1f}, 'Disco', {disco_s1:.1f}, NOW());")
            
        # if(problema == 10):
        #     problema = 0 

        print(cpu_m1)
        print(cont)
        print(problema + 1)

        problema += 1


        time.sleep(3)
        rudge_ramos()
 

if (conexao.is_connected()):
    print("A Conexão ao MySql foi iniciada ")
    rudge_ramos()
else:
    print("Houve erro ao conectar")