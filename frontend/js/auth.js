document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
} });

async function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }

  const result = await postData("/auth/register", { name, email, password });

  if (result.success) {
    alert(
      "Cadastro realizado com sucesso! Você será redirecionado para o login."
    );
    window.location.href = "tela_login.html";
  } else {
    alert(`Erro no cadastro: ${result.message}`);
} }

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const result = await postData("/auth/login", { email, password });

  if (result.success) {
    localStorage.setItem("authToken", result.data.token);
    alert("Login bem-sucedido!");
    window.location.href = "index.html";
  } else {
    alert(`Erro no login: ${result.message}`);
} }