function entrarUsuario() {

    const usuario = document.getElementById("cpf").value;
    const senha = document.getElementById("password").value;

    if (usuario && senha) {
        const usuarios = JSON.parse(localStorage.getItem("cadastro")) || [];
        const usuarioEncontrado = usuarios.find(u => u.cpf === usuario && u.password === senha);

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioAtual", JSON.stringify(usuarioEncontrado));
            alert("Bem-vindo !");
         let admin=JSON.parse(localStorage.getItem("usuarioAtual"))
          if(admin.cpf=="12345"){
            location.href="vacina.html"
          }
          else{
            location.href="cadastro.html"
          }

        } else {
            alert("Dados não identificados. Tente novamente.");
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}


