import psutil
import time
from tkinter import *
from tkinter import ttk
from datetime import datetime
import os
import mysql.connector
import requests
import json
import platform
from jira_bot import create_issue


conexao = mysql.connector.connect(
    user="user_bankSecure",
    password="Urubu_100",
    host="localhost",
    database="bankSecure",
    auth_plugin="mysql_native_password",
)
cursor = conexao.cursor()

maquina = ""

prioridades = {"maior": 1, "alta": 2, "media": 3, "pequena": 4, "menor": 1}


if conexao.is_connected():
    print("A Conexão ao MySql foi iniciada ")
else:
    print("Houve erro ao conectar")


def login():
    email = email_entry.get()
    senha = senha_entry.get()
    cursor.execute(
        f'SELECT * FROM usuario WHERE email = "{email}" AND senha = "{senha}"'
    )
    result = cursor.fetchall()
    if len(result) > 0:
        login_frame.grid_forget()
        main_frame.grid(column=0, row=0)
        pegar_dados()

    else:
        mensagem_label.config(text="Credenciais incorretas")


# login()
def pegar_dados():
    comp1 = "Memória"
    comp2 = "CPU"
    comp3 = "Disco"
    maquina = "MI-1"
    maquina1 = "MI-2"
    maquina2 = "MI-3"
    maquina3 = "SI-1"

    while True:
        data = datetime.now()
        data = data.strftime("%Y/%m/%d %H:%M:%S")

        qtd_core = psutil.cpu_count(logical=False)

        cpu_m1 = psutil.cpu_percent(interval=1)
        cpu_speed = psutil.cpu_freq().current / pow(10, 3)
        cpu_speed_max = psutil.cpu_freq().max / pow(10, 3)

        so = platform.system()
        processor = platform.processor()

        if so == "Windows":
            # DIRETÓRIO PARA WINDOWS

            disco_total = psutil.disk_usage("C:\\").total / pow(10, 9)
            disc_used = psutil.disk_usage("C:\\").used / pow(10, 9)
            disco_m1 = psutil.disk_usage("C:\\").percent
        elif so == "Linux":
            # DIRETÓRIO PARA LINUX
            disco_total = psutil.disk_usage("/bin").total / pow(10, 9)
            disc_used = psutil.disk_usage("/bin").used / pow(10, 9)
            disco_m1 = psutil.disk_usage("/bin").percent

        ram_total = (psutil.virtual_memory().total) / pow(10, 9)
        ram_used = (psutil.virtual_memory().used) / pow(10, 9)
        ram_m1 = psutil.virtual_memory().percent

        cpu_m1 = round(cpu_m1, 2)
        cpu_speed = round(cpu_speed, 2)
        cpu_speed_max = round(cpu_speed_max, 2)

        disco_total = round(disco_total, 2)
        disc_used = round(disc_used, 2)
        disco_m1 = round(disco_m1, 2)

        ram_total = round(ram_total, 2)
        ram_used = round(ram_used, 2)
        ram_m1 = round(ram_m1, 2)

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

        # if ram_percent >= 60.0 and ram_percent < 75.0:
        #     issue_manipulation(maquina, comp1, ram_percent, 3)
        # elif ram_percent >= 75.0 and ram_percent < 90:
        #     issue_manipulation(maquina, comp1, ram_percent, 2)
        # elif ram_percent >= 90:
        #     issue_manipulation(maquina, comp1, ram_percent, 1)

        # if cpu_percent >= 60.0 and cpu_percent < 75.0:
        #     issue_manipulation(maquina, comp2, cpu_percent, 3)
        # elif cpu_percent >= 75.0 and cpu_percent < 90:
        #     issue_manipulation(maquina, comp2, cpu_percent, 2)
        # elif cpu_percent >= 90:
        #     issue_manipulation(maquina, comp2, cpu_percent, 1)
            

        # if disc_percent >= 60.0 and disc_percent < 75.0:
        #     issue_manipulation(maquina, comp3, disc_percent, 3)
        # elif disc_percent >= 75.0 and disc_percent < 90:
        #     issue_manipulation(maquina, comp3, disc_percent, 2)
        # elif disc_percent >= 90:
        #     print("esse foi acessado")
        #     issue_manipulation(maquina, comp3, disc_percent, 1)

        #Maquina 1
        if ram_m1 >= 60.0 and ram_m1 < 75.0:
            problema = issue_manipulation(maquina, comp1, ram_m1, 3)
        elif ram_m1 >= 75.0 and ram_m1 < 90:
            problema = issue_manipulation(maquina, comp1, ram_m1, 2)
        elif ram_m1 >= 90:
            problema = issue_manipulation(maquina, comp1, ram_m1, 1)

        if cpu_m1 >= 60.0 and cpu_m1 < 75.0:
            problema = issue_manipulation(maquina, comp2, cpu_m1, 3)
        elif cpu_m1 >= 75.0 and cpu_m1 < 90:
            problema = issue_manipulation(maquina, comp2, cpu_m1, 2)
        elif cpu_m1 >= 90:
            problema = issue_manipulation(maquina, comp2, cpu_m1, 1)

        if disco_m1 >= 60.0 and disco_m1 < 75.0:
            problema = issue_manipulation(maquina, comp3, disco_m1, 3)
        elif disco_m1 >= 75.0 and disco_m1 < 90:
            problema = issue_manipulation(maquina, comp3, disco_m1, 2)
        elif disco_m1 >= 90:
            problema = issue_manipulation(maquina, comp3, disco_m1, 1)

        #Maquina 2
        if ram_m2 >= 60.0 and ram_m2 < 75.0:
            problema = issue_manipulation(maquina1, comp1, ram_m2, 3)
        elif ram_m2 >= 75.0 and ram_m2 < 90:
            problema = issue_manipulation(maquina1, comp1, ram_m2, 2)
        elif ram_m2 >= 90:
            problema = issue_manipulation(maquina1, comp1, ram_m2, 1)

        if cpu_m2 >= 60.0 and cpu_m2 < 75.0:
            problema = issue_manipulation(maquina1, comp2, cpu_m2, 3)
        elif cpu_m2 >= 75.0 and cpu_m2 < 90:
            problema = issue_manipulation(maquina1, comp2, cpu_m2, 2)
        elif cpu_m2 >= 90:
            problema = issue_manipulation(maquina1, comp2, cpu_m2, 1)

        if disco_m2 >= 60.0 and disco_m2 < 75.0:
            problema = issue_manipulation(maquina1, comp3, disco_m2, 3)
        elif disco_m2 >= 75.0 and disco_m2 < 90:
            problema = issue_manipulation(maquina1, comp3, disco_m2, 2)
        elif disco_m2 >= 90:
            problema = issue_manipulation(maquina1, comp3, disco_m2, 1)

        #Maquina 3
        if ram_m3 >= 60.0 and ram_m3 < 75.0:
            problema = issue_manipulation(maquina2, comp1, ram_m3, 3)
        elif ram_m3 >= 75.0 and ram_m3 < 90:
            problema = issue_manipulation(maquina2, comp1, ram_m3, 2)
        elif ram_m3 >= 90:
            problema = issue_manipulation(maquina2, comp1, ram_m3, 1)

        if cpu_m3 >= 60.0 and cpu_m3 < 75.0:
            problema = issue_manipulation(maquina2, comp2, cpu_m3, 3)
        elif cpu_m3 >= 75.0 and cpu_m3 < 90:
            problema = issue_manipulation(maquina2, comp2, cpu_m3, 2)
        elif cpu_m3 >= 90:
            problema = issue_manipulation(maquina2, comp2, cpu_m3, 1)

        if disco_m3 >= 60.0 and disco_m3 < 75.0:
            problema = issue_manipulation(maquina2, comp3, disco_m3, 3)
        elif disco_m3 >= 75.0 and disco_m3 < 90:
            problema = issue_manipulation(maquina2, comp3, disco_m3, 2)
        elif disco_m3 >= 90:
            problema = issue_manipulation(maquina2, comp3, disco_m3, 1)

        #Maquina 4
        if ram_s1 >= 60.0 and ram_s1 < 75.0:
            problema = issue_manipulation(maquina3, comp1, ram_s1, 3)
        elif ram_s1 >= 75.0 and ram_s1 < 90:
            problema = issue_manipulation(maquina3, comp1, ram_s1, 2)
        elif ram_s1 >= 90:
            problema = issue_manipulation(maquina3, comp1, ram_s1, 1)

        if cpu_s1 >= 60.0 and cpu_s1 < 75.0:
            problema = issue_manipulation(maquina3, comp2, cpu_s1, 3)
        elif cpu_s1 >= 75.0 and cpu_s1 < 90:
            problema = issue_manipulation(maquina3, comp2, cpu_s1, 2)
        elif cpu_s1 >= 90:
            problema = issue_manipulation(maquina3, comp2, cpu_s1, 1)

        if disco_s1 >= 60.0 and disco_s1 < 75.0:
            problema = issue_manipulation(maquina3, comp3, disco_s1, 3)
        elif disco_s1 >= 75.0 and disco_s1 < 90:
            problema = issue_manipulation(maquina3, comp3, disco_s1, 2)
        elif disco_s1 >= 90:
            problema = issue_manipulation(maquina3, comp3, disco_s1, 1)



        cursor.execute(f"CALL inserirDadosMaquina ('{maquina}', '{comp1}', {ram_m1}, '{comp2}', {cpu_m1}, '{comp3}', {disco_m1}, NOW());")
        cursor.execute(f"CALL inserirDadosMaquina ('{maquina1}', 'Memória', {ram_m2:.1f}, 'CPU', {cpu_m2:.1f}, 'Disco', {disco_m2:.1f}, NOW());")
        cursor.execute(f"CALL inserirDadosMaquina ('{maquina2}', 'Memória', {ram_m3:.1f}, 'CPU', {cpu_m3:.1f}, 'Disco', {disco_m3:.1f}, NOW());")
        cursor.execute(f"CALL inserirDadosMaquina ('{maquina3}', 'Memória', {ram_s1:.1f}, 'CPU', {cpu_s1:.1f}, 'Disco', {disco_s1:.1f}, NOW());")
        data_label.config(text=f"{data}")
        cpu_m1agem_uso_label.config(text=f"Porcentagem de uso\n{cpu_m1}%")
        cpu_velocidade_label.config(text=f"Velocidade\n{cpu_speed}GHz")
        cpu_velocidade_maxima_label.config(
            text=f"Velocidade Maxima\n{cpu_speed_max}GHz"
        )
        disco_porcentagem_uso_label.config(text=f'"Porcentagem de uso\n{disco_m1}%')
        disco_total_label.config(text=f"Total\n{disco_m1}GB")
        disco_uso_label.config(text=f"Em uso\n{disc_used}GB")
        ram_porcentagem_uso_label.config(text=f'"Porcentagem de uso\n{ram_m1}%')
        ram_total_label.config(text=f"Total\n{ram_total}GB")
        ram_uso_label.config(text=f"Em uso\n{ram_used}GB")

        # Gravar os dados na tabela definitiva
        conexao.commit()
        # texto_cotacao['text'] = msgOpen
        root.update()
        time.sleep(1)


# cria a root
root = Tk()
style = ttk.Style()

style.configure("TLabel", font=("Arial", 12))
style.configure("TText", width=10)
root.title("Monitor Bank Secure")
# root.geometry("700x500")
root.rowconfigure(0, weight=1)
root.columnconfigure(0, weight=1)

# qual root ele faz parte e qual é o texto
login_frame = ttk.Frame(root, height=700, width=700, padding=30)
login_frame.grid(column=0, row=0)
login_frame.config(padding=100)
email_label = ttk.Label(login_frame, text="Email: ")
email_label.grid(column=1, row=2, padx=10, pady=10)

email_entry = ttk.Entry(login_frame, width=25)
email_entry.grid(column=2, row=2)

senha_label = ttk.Label(login_frame, text="Senha: ")
senha_label.grid(column=1, row=3, padx=10, pady=10)

senha_entry = ttk.Entry(login_frame, width=25, show="*")
senha_entry.grid(column=2, row=3)

mensagem_label = ttk.Label(login_frame, text="")
mensagem_label.grid(column=2, row=4)

login_button = ttk.Button(login_frame, text="Entrar", command=login)
login_button.grid(column=2, row=5)

main_frame = ttk.Frame(root, height=700, width=700, padding=30)
main_frame.config(padding=100)

banksecure_label = ttk.Label(main_frame, text="Bank Secure Monitor Report")
data_label = ttk.Label(main_frame, text="")
usuario_label = ttk.Label(main_frame, text="Usuario: Gerente")
maquina_label = ttk.Label(main_frame, text="Maquina: M3-I")

cpu_header_label = ttk.Label(main_frame, text="CPU")
cpu_m1agem_uso_label = ttk.Label(main_frame, text="Porcentagem de uso\n")
cpu_velocidade_label = ttk.Label(main_frame, text="Velocidade\n")
cpu_velocidade_maxima_label = ttk.Label(main_frame, text="Velocidade Maxima\n")

disco_header_label = ttk.Label(main_frame, text="Disco")
disco_porcentagem_uso_label = ttk.Label(main_frame, text="Porcentagem de uso\n")
disco_total_label = ttk.Label(main_frame, text="Total\n")
disco_uso_label = ttk.Label(main_frame, text="Em uso\n")

ram_header_label = ttk.Label(main_frame, text="RAM")
ram_porcentagem_uso_label = ttk.Label(main_frame, text="Porcentagem de uso\n")
ram_total_label = ttk.Label(main_frame, text="Total\n")
ram_uso_label = ttk.Label(main_frame, text="Em uso\n")

banksecure_label.grid(column=1, row=1, columnspan=3)
data_label.grid(column=8, row=1, columnspan=2)
usuario_label.grid(column=8, row=2, columnspan=2)
maquina_label.grid(column=8, row=3, columnspan=2)

cpu_header_label.grid(column=2, row=5, padx=5, pady=5)
cpu_m1agem_uso_label.grid(column=3, row=5, columnspan=2, padx=5, pady=5)
cpu_velocidade_label.grid(column=5, row=5, padx=5, pady=5)
cpu_velocidade_maxima_label.grid(column=7, row=5, columnspan=2, padx=5, pady=5)


disco_header_label.grid(column=2, row=6, padx=5, pady=5)
disco_porcentagem_uso_label.grid(column=3, row=6, columnspan=2, padx=5, pady=5)
disco_total_label.grid(column=5, row=6, padx=5, pady=5)
disco_uso_label.grid(column=7, row=6, padx=5, pady=5)

ram_header_label.grid(column=2, row=7, padx=5, pady=5)
ram_porcentagem_uso_label.grid(column=3, row=7, columnspan=2, padx=5, pady=5)
ram_total_label.grid(column=5, row=7, padx=5, pady=5)
ram_uso_label.grid(column=7, row=7, padx=5, pady=5)


root.mainloop()
