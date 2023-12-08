function search() {
  var obj_ls = JSON.parse(localStorage.getItem("item"));

  var html = ``;
  obj_ls.forEach((element, index) => {
    html += `Nome: ${element.nome} <br>Local: ${element.local} <br>Descrição: ${element.descricao} <br><button onclick="deleteData(${index})">EXCLUIR</button><br>`;
  })

  document.getElementById("cards").innerHTML = html;
}

function openTab(tabId) {
  // Simulando notícias em formato JSON
  const newsData = [
    { title: 'Notícia 1', link: 'https://www.noticia1.com' },
    { title: 'Notícia 2', link: 'https://www.noticia2.com' },
    { title: 'Notícia 3', link: 'https://www.noticia3.com' },
  ];

  // Função para carregar as notícias na barra lateral
  function loadNews() {
    const newsList = document.getElementById('news-list');

    newsData.forEach(news => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = news.link;
      link.target = '_blank';
      link.textContent = news.title;
      listItem.appendChild(link);
      newsList.appendChild(listItem);
    });
  }

  // Carregar as notícias ao carregar a página
  document.addEventListener('DOMContentLoaded', loadNews);

}
