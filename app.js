process.env.AMBIENTE_PROCESSO = "producao";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require('./src/routes/user');
var machineRouter = require('./src/routes/machine')
var alertRouter = require('./src/routes/alerts')
var parametersRouter = require('./src/routes/parameters')
var commandRouter = require('./src/routes/command')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use('/usuario', usuarioRouter)
app.use('/machine', machineRouter)
app.use('/alert', alertRouter)
app.use('/parameters', parametersRouter)
app.use('/command', commandRouter)

app.listen(PORTA, () => {
  console.log(`App rodando na porta ${PORTA}\nhttp://localhost:${PORTA}`)
});
