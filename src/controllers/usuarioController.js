var uuid = require('uuid');

var model = require('../models/usuarioModel')

function cadastrar(req, res) {
  const usuario = {
    id: uuid.v4(),
    email: req.email,
    senha: req.senha,
    nome: req.nome,
    sobrenome: req.sobrenome,
    cargo: req.cargo,
    idEstabelecimento: req.idEstabelecimento
  }

  return model.cadastrar(usuario)
}

function autenticar(req, res) {
  model.autenticar(req.body.email, req.body.senha)
    .then(result => {
      res.json({
        id: result[0].id,
        email: result[0].email,
        senha: result[0].senha,
        nome: result[0].nome,
        sobrenome: result[0].sobrenome,
        idEstabelecimento: result[0].fkEstabelecimento
      })
    })
}

module.exports = {
  cadastrar,
  autenticar
}