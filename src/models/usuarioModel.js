

var database = require('../database/config')

async function cadastrarempresa(empresa) {
  var query1 = `INSERT INTO adera.estabelecimento VALUES ('${empresa.id}', '${empresa.nome}', '${empresa.cnpj}')`;
  var query2 = `INSERT INTO adera.endereco VALUES ('${empresa.cep}', '${empresa.logradouro}', '${empresa.numero}', '${empresa.cidade}', '${empresa.estado}', '${empresa.complemento}', '${empresa.bairro}', '${empresa.id}');`;
  var query3 = `INSERT INTO adera.usuario VALUES ('${uuid.v4()}', '${empresa.email}', '${empresa.senha}', 'Administrador', '${empresa.nome}', 'Administrador', '${empresa.id}');`
  const results = await Promise.all([
    database.executar(query1),
    database.executar(query2),
    database.executar(query3)
  ]);
  return results;
}


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
  deleteById,
  cadastrarempresa
}