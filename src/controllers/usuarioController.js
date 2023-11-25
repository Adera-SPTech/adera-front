var uuid = require('uuid');

var model = require('../models/usuarioModel')

function cadastrar(req, res) {
  const usuario = {
    id: uuid.v4(),
    email: req.body.email,
    senha: req.body.senha,
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    cargo: req.body.cargo,
    idEstabelecimento: req.body.idEstabelecimento
  }

  model.cadastrar(usuario)
    .then(result => {
      res.status(200).json(result)
    })
}

function autenticar(req, res) {
  model.autenticar(req.body.email, req.body.senha)
    .then(result => {
      if(result.length > 0) {
        res.json({
          id: result[0].id,
          email: result[0].email,
          senha: result[0].senha,
          nome: result[0].nome,
          sobrenome: result[0].sobrenome,
          idEstabelecimento: result[0].fkEstabelecimento
        })
      } else {
        res.status(400)
      }
    })
}
function getByEstablishmentId(req, res) {
  model.getByEstablishmentId(req.params.establishmentId)
    .then(result => {
      res.json(result);
    })
}

function atualizar(req, res) {
  model.atualizar(req.body)
    .then(result => {
      res.json(result)
    })
}

function deleteById(req, res) {
  model.deleteById(req.params.userId)
    .then(result => {
      res.json(result)
    })
}

module.exports = {
  cadastrar,
  autenticar,
  getByEstablishmentId,
  atualizar,
  deleteById
}