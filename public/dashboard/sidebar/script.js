const sideBar = document.getElementById('sidebar')
const sidebarBtn = document.getElementById('hamburguer-btn')

sidebarBtn.addEventListener('click', (e) => {
  e.preventDefault()
  sideBar.classList.toggle('open')
})

// function logOut(){

// }