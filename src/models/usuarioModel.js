

var database = require('../database/config')

function autenticar(email, senha) {
  var query = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';`
  return database.executar(query)
}

function cadastrar(usuario, idEstabelecimento) {
  var query = `INSERT INTO usuario VALUES ('${usuario.id}', '${usuario.email}', '${usuario.senha}', '${usuario.nome}', '${usuario.sobrenome}', '${usuario.cargo}', '${usuario.idEstabelecimento}');`
  return database.executar(query)
}

module.exports = {
  autenticar,
  cadastrar
}