const apiUrl = 'https://jsonserver-sprint3.nataliasilva127.repl.co/vacinas';

function displayMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readVacina(processaDados) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      processaDados(data);
    })
    .catch(error => {
      console.error('Erro ao ler dados via API JSONServer:', error);
      displayMessage("Erro ao ler dados.");
    });
}

// Menu lateral
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
