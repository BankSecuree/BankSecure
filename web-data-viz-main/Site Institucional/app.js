process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var loginRouter = require("./src/routes/login");
var usuariosRouter = require("./src/routes/usuarios");
var agenciasRouter = require("./src/routes/agencias");
var dashAgenciasRouter = require("./src/routes/dashAgencias");
var perfilRouter = require("./src/routes/perfil");
var hardwareRouter = require("./src/routes/hardware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/login", loginRouter);
app.use("/usuarios", usuariosRouter);
app.use("/agencias", agenciasRouter);
app.use("/dashAgencias", dashAgenciasRouter);
app.use("/perfil", perfilRouter);
app.use("/hardware", hardwareRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
