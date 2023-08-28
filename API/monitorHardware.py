import psutil
import time 
from tkinter import *
from datetime import datetime
import os
import mysql.connector
import requests 
import json
import mysql.connector
 
conexao = mysql.connector.connect(user='bs_itau', password='itau100', host='localhost', database='bankSecure')

cursor = conexao.cursor()

if (conexao.is_connected()):
        print("A Conexão ao MySql foi iniciada ")
else:
     print("Houve erro ao conectar")

def pegar_dados():
  
    exibiu = False

    while True:
    
     data = datetime.now()
     data = data.strftime('%Y/%m/%d %H:%M:%S')

     user = [user[0] for user in psutil.users()]
     user = user[0]
     processador = ""
     qtd_core = psutil.cpu_count(logical=False)

     cpu_porcent = psutil.cpu_percent(interval=1)
     cpu_speed = psutil.cpu_freq().current / pow(10,3)
     cpu_speed_max = psutil.cpu_freq().max / pow(10,3)

    
     so = psutil.disk_partitions
    # DIRETÓRIO PARA WINDOWS

     disc_total = psutil.disk_usage('C:\\').total / pow(10,9)
     disc_used = psutil.disk_usage('C:\\').used / pow(10,9)
     disc_percent = psutil.disk_usage('C:\\').percent

    # DIRETÓRIO PARA LINUX

    #  disc_total = psutil.disk_usage('/bin').total / pow(10,9)
    #  disc_used = psutil.disk_usage('/bin').used / pow(10,9)
    #  disc_percent = psutil.disk_usage('/bin').percent

     ram_total = (psutil.virtual_memory().total) / pow(10,9)
     ram_used = (psutil.virtual_memory().used) / pow(10,9)
     ram_percent = psutil.virtual_memory().percent

     msgOpen = f"""
    
     Bank Secure Monitor Report               {data}     
                                                                 
                    USER  ==> {user}                                                               
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
             chatItau = ""

             postMsg = requests.post(chatItau, data=json.dumps(mensagem))
             exibiu = True

     print(data)
     cursor.execute("INSERT INTO registrosAPI (cpu, memoria, disco, dataHora) VALUES (%s, %s, %s, %s)",
    (cpu_porcent, ram_percent, disc_percent, data))
    #Gravar os dados na tabela definitiva
     conexao.commit()
     texto_cotacao['text'] = msgOpen
     janela.update()
    #  time.sleep(3)

     
# cria a janela
janela = Tk()
janela.title("Seja bem-vindo(a!)")
janela.geometry("530x580+600+0")
janela.config(bg="darkblue")

# qual janela ele faz parte e qual é o texto
texto_dados = Label(janela, text="Clique aqui para ver os registros da Cpu, disco e memória")
texto_dados.grid(column=0, row=-0, padx=40, pady=40)

#passar a função como parametro, não estou executando a função
botao = Button(janela, text="Buscar dados", command=pegar_dados)
botao.grid(column=0, row=1)

texto_cotacao= Label(janela, text="")
texto_cotacao.grid(column=0, row=2, padx=10, pady=10)

# caminho da imagem
pastaApp = os.path.dirname(__file__)

#indicamos qual é o arquivo e a pasta
imgLogo=PhotoImage(file=pastaApp+"//computadores.png")

#definindo a janela e a imagem 
l_logo=Label(janela,image=imgLogo)

#lugar aonde ela irá aparecer
l_logo.place(x=190, y=460)

# para deixar a janela exibida
janela.mainloop()
