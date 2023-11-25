
let users = [];
let selectedUserIndex = null;
var selectedUserId = null;'''''1

document.getElementById('add-user-btn').addEventListener('click', e => toggleModal('add-user'))

async function getUsers() {
  const table = document.getElementById('table-body')
  table.innerHTML = ''
  var establishmentId = sessionStorage.getItem('establishmentId');

  var res = await fetch(`/usuario/${establishmentId}`).then(res => res.json());
  console.log(res);
  users = res;
  users.forEach(renderUser)
}

function renderUser(user, index) {
  var html = `
    <tr class="user" id="user-${index}">
      <td>${user.nome} ${user.sobrenome}</td>
      <td>${user.cargo}</td>
      <td>${user.email}</td>
      <td class="actions">
        <img src="../../assets/user-pen-solid.svg" alt="Edit icon" onclick="toggleModal('edit-user', ${index})">
        <img src="../../assets/trash-solid.svg" alt="Trash icon" onclick="toggleModal('delete-user', ${index})">
      </td>
    </tr>
  `

  const table = document.getElementById('table-body')
  table.innerHTML += html;
}

function toggleModal(modal, userIndex = null) {
  selectedUserIndex = null
  selectedUserId = null

  const wrapper = document.getElementById('modals-wrapper')
  const modalDiv = document.getElementById(modal)

  wrapper.classList.toggle('modal-wrapper-shown')

  setTimeout(() => modalDiv.classList.toggle('modal-shown'), 10);

  if(modal == 'edit-user' && userIndex != null) {
    fillUpdateModal(users[userIndex])
  } else if(modal == 'delete-user' && userIndex != null) {
    alert(userIndex)
    selectedUserIndex = userIndex;
    selectedUserId = users[selectedUserIndex].id
  }
}


function fillUpdateModal(user) {
  selectedUserId = user.id
  nameOnUpdate.value = user.nome
  lastnameOnUpdate.value = user.sobrenome
  emailOnUpdate.value = user.email
  passwordOnUpdate.value = user.senha
  roleOnUpdate.value = user.cargo
}

function getActiveModal() {

  var activeModals = document.getElementsByClassName('modal-shown')

  var ids = []
  for(let i = 0; i < activeModals.length; i++) {
    ids.push(activeModals[i].id)
  }

  return ids
}

async function addUser() {
  var user = {
    nome: nameOnCreate.value,
    sobrenome: lastnameOnCreate.value,
    email: emailOnCreate.value,
    senha: passwordOnCreate.value,
    cargo: roleOnCreate.value,
    idEstabelecimento: sessionStorage.getItem('establishmentId')
  }

  var res = await fetch('/usuario/cadastrar', { method: 'POST', headers: { "Content-Type": "application/json"}, body: JSON.stringify(user) })
    .then(res => res.json())

  let selectedUserIndex = null;
  var selectedUserId = null;
  toggleModal('add-user')
  getUsers()
}

async function updateUser() {
  var user = {
    id: selectedUserId,
    nome: nameOnUpdate.value,
    sobrenome: lastnameOnUpdate.value,
    email: emailOnUpdate.value,
    senha: passwordOnUpdate.value,
    cargo: roleOnUpdate.value,
    idEstabelecimento: sessionStorage.getItem('establishmentId')
  }

  var res = await fetch('/usuario', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })

  console.log(res)
  getUsers();
  toggleModal('edit-user')
}

async function deleteUser() {
  console.log(selectedUserId)
  console.log(selectedUserIndex)
  console.log(users[selectedUserIndex])
  var res = await fetch(`/usuario/${selectedUserId}`,
  {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  })

  let selectedUserIndex = null;
  var selectedUserId = null;
  toggleModal('delete-user')
  getUsers()
}

getUsers();