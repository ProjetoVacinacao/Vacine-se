document.addEventListener("DOMContentLoaded", function() {
  fetch('https://jsonservertelamapa.maria-eduard613.repl.co/usuarios')
    .then(res => res.json())
    .then(contatos => displayContatos(contatos));
});

function displayContatos(contatos) {
  const tableBody = document.querySelector('#contatosTable tbody');
  tableBody.innerHTML = '';

  contatos.forEach(contato => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = contato.posto;
    row.insertCell(1).textContent = contato.endereco;
    row.insertCell(2).textContent = contato.regional;
  });
}

/*Início pesquisa dos postos*/
let pesquisarEl = document.getElementById("pesquisar");
let opcoesEl = document.getElementById("opcoes");
pesquisarEl.addEventListener('input', pesquisar);

function pesquisar() {
  let termoPesquisa = pesquisarEl.value.toLowerCase();
  const elementos = document.querySelectorAll('#contatosTable tbody tr');

  elementos.forEach(elemento => {
    var valor = opcoesEl.options[opcoesEl.selectedIndex].value;
    var regional;
    if (valor == "opcao1") {
      regional = elemento.children[0].textContent.toLowerCase();
    }
    else if (valor == "opcao2") {
      regional = elemento.children[1].textContent.toLowerCase();
    }
    else {
      regional = elemento.children[2].textContent.toLowerCase();
    }

    if (regional.includes(termoPesquisa)) {
      elemento.style.display = '';
    } else {
      elemento.style.display = 'none';
    }
  });
}
/*Final pesquisa dos postos*/

/*Início java script do menu lateral*/
var menuItem = document.querySelectorAll('.item-menu');

function selectionLink() {
  menuItem.forEach(function(item) {
    item.classList.remove('ativo');
  });
  this.classList.add('ativo');
}

menuItem.forEach(function(item) {
  item.addEventListener('click', selectionLink);
});
/*Final java script do menu lateral*/
