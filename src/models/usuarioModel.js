

var database = require('../database/config')

function autenticar(email, senha) {
  var query = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';`
  return database.executar(query)
}

function cadastrar(usuario, idEstabelecimento) {
  var query = `INSERT INTO usuario VALUES ('${usuario.id}', '${usuario.email}', '${usuario.senha}', '${usuario.nome}', '${usuario.sobrenome}', '${usuario.cargo}', '${usuario.idEstabelecimento}');`
  return database.executar(query)
}

function getByEstablishmentId(idEstabelecimento) {
  var query = `SELECT * FROM usuario WHERE fkEstabelecimento = '${idEstabelecimento}' ORDER BY usuario.nome`
  return database.executar(query)
}

function atualizar(user) {
  var query = `UPDATE usuario SET nome = '${user.nome}', sobrenome = '${user.sobrenome}', email = '${user.email}', senha = '${user.senha}', cargo = '${user.cargo}' WHERE id = '${user.id}'`
  return database.executar(query)
}

function deleteById(userId) {
  var query = `DELETE FROM usuario WHERE id = '${userId}'`
  return database.executar(query)
}

module.exports = {
  autenticar,
  cadastrar,
  getByEstablishmentId,
  atualizar,
  deleteById
}