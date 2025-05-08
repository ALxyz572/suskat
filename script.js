
function toggleForm(mode) {
  document.getElementById('form-login').style.display = (mode === 'login') ? 'block' : 'none';
  document.getElementById('form-register').style.display = (mode === 'register') ? 'block' : 'none';
}
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('../login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(res => {
    if (res.success) {
      localStorage.setItem('user', username);
      showDashboard(username);
    } else {
      alert(res.message);
    }
  });
}
function register() {
  const username = document.getElementById('newuser').value;
  const password = document.getElementById('newpass').value;
  fetch('../register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(res => {
    alert(res.message);
    if (res.success) toggleForm('login');
  });
}
function logout() {
  localStorage.removeItem('user');
  location.reload();
}
function addNomor() {
  const nomor = document.getElementById('nomor').value;
  if (!nomor.startsWith("62")) return alert("Gunakan format 62xxxxxx");
  fetch('../add_number.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nomor })
  }).then(res => res.json()).then(res => {
    alert(res.message);
  });
}
function toggleMode() {
  document.body.classList.toggle('dark');
}
function showDashboard(user) {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('displayUser').textContent = user;
}
window.onload = () => {
  const user = localStorage.getItem('user');
  if (user) showDashboard(user);
}
