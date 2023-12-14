function entrarUsuario() {
  const cpf = document.getElementById("username").value;
  const senha = document.getElementById("password").value;

  console.log("CPF digitado:", cpf);
  console.log("Senha digitada:", senha);

  if (cpf && senha) {
    if (cpf === "admin" && senha === "admin") {
      alert("Bem-vindo, Admin!");
      window.location.href = "../cadastroVacina/index.html";
    } else {
      const cadastros = JSON.parse(localStorage.getItem("cadastro")) || [];
      const usuarioEncontrado = cadastros.find(c => c.cpf === cpf && c.password === senha);

      if (usuarioEncontrado) {
        sessionStorage.setItem("usuarioAtual", JSON.stringify(usuarioEncontrado));
        alert("Bem-vindo, " + usuarioEncontrado.firstname + "!");
        window.location.href = "../cartaoVacina/cartao.html";
      } else {
        alert("Credenciais inválidas. Tente novamente.");
      }
    }
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}
