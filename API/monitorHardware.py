import psutil
import time 
from tkinter import *
from datetime import datetime
import os
import mysql.connector

conexao = mysql.connector.connect(user='user_bankSecure', password='urubu100', host='localhost', database='bankSecure', auth_plugin='mysql_native_password')

cursor = conexao.cursor()

if (conexao.is_connected()):
        print("A Conexão ao MySql foi iniciada ")
else:
     print("Houve erro ao conectar")

def pegar_dados():
  
  
    while True:
    
     data = datetime.now()
     data = data.strftime('%Y/%m/%d %H:%M:%S')

     user = [user[0] for user in psutil.users()]
     user = user[0]
     processador = "não sei"
     qtd_core = psutil.cpu_count(logical=False)

     cpu_porcent = psutil.cpu_percent(interval=1)
     cpu_speed = psutil.cpu_freq().current / 1000
     cpu_speed_max = psutil.cpu_freq().max / 1000


    # DIRETÓRIO PARA WINDOWS

    #  disc_total = psutil.disk_usage('C:\\').total / 1000000000
    #  disc_used = psutil.disk_usage('C:\\').used / 1000000000
    #  disc_percent = psutil.disk_usage('C:\\').percent

    # DIRETÓRIO PARA LINUX

     disc_total = psutil.disk_usage('/bin').total / 1000000000
     disc_used = psutil.disk_usage('/bin').used / 1000000000
     disc_percent = psutil.disk_usage('/bin').percent

     ram_total = (psutil.virtual_memory().total) / 1000000000
     ram_used = (psutil.virtual_memory().used) / 1000000000
     ram_percent = psutil.virtual_memory().percent

     msgOpen = f"""
    __________________________________________________________________
    |                                                                 |
    | Bank Secure Monitor Report               {data:10s}     
    |_________________________________________________________________|
                                                                 
                      USER ==> {user:20s}                                                               
    HARDWARE   ==> {processador:17s}                                
COREs      ==> {qtd_core:16.0f}                                 
    |_________________________________________________________________|
    |                                                                  |
    | #          ==>     PORCENT     |      SPEED     |   MAX SPEED    |
    | CPU        ==>     {cpu_porcent:6.1f}%     |    {cpu_speed:3.2f}GHz     |   {cpu_speed_max:6.2f}GHz |
    |__________________________________________________________________|
    |                                                                  |
    | #          ==>     PORCENT     |      TOTAL     |      USED      |
    | DISC (GB)  ==>     {disc_percent:6.1f}%     |     {disc_total:6.1f}     |    {disc_used:6.1f}       |
    | RAM  (GB)  ==>     {ram_percent:6.1f}%     |     {ram_total:6.1f}       |    {ram_used:6.1f}        |
    |__________________________________________________________________|
   
    """
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
