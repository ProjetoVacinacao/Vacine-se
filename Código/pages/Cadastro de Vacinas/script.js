function addVaccine() {
    var name = document.getElementById('vaccine-name').value;
    var lot = document.getElementById('vaccine-lot').value;
    var manufacturer = document.getElementById('vaccine-manufacturer').value;
    var applier = document.getElementById('applier').value;
    var applicationDate = document.getElementById('application-date').value;

    if (name && lot && manufacturer && applier && applicationDate) {
      // Criar um objeto para representar a vacina
      var vaccineData = {
        name: name,
        lot: lot,
        manufacturer: manufacturer,
        applier: applier,
        applicationDate: applicationDate
      };

      // Obter os dados existentes do localStorage ou inicializar uma lista vazia
      var vaccineList = JSON.parse(localStorage.getItem('vaccineList')) || [];

      // Adicionar a nova vacina à lista
      vaccineList.push(vaccineData);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('vaccineList', JSON.stringify(vaccineList));

      // Atualizar a lista na interface
      updateVaccineList();

      // Limpar campos do formulário
      document.getElementById('vaccine-form').reset();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  function deleteVaccine(index) {
    // Obter a lista atualizada do localStorage
    var vaccineList = JSON.parse(localStorage.getItem('vaccineList')) || [];

    // Remover a vacina pelo índice
    vaccineList.splice(index, 1);

    // Salvar a lista atualizada no localStorage
    localStorage.setItem('vaccineList', JSON.stringify(vaccineList));

    // Atualizar a lista na interface
    updateVaccineList();
  }

  function updateVaccineList() {
    // Obter a lista atualizada do localStorage
    var vaccineList = JSON.parse(localStorage.getItem('vaccineList')) || [];

    // Limpar a lista na interface
    document.getElementById('vaccine-list').innerHTML = '';

    // Adicionar cada vacina à lista na interface
    vaccineList.forEach(function(vaccineData, index) {
      var vaccineItem = document.createElement('li');
      vaccineItem.innerHTML = `<strong>${vaccineData.name}</strong> - Lote: ${vaccineData.lot}, Fabricante: ${vaccineData.manufacturer}, Aplicador: ${vaccineData.applier}, Data: ${vaccineData.applicationDate}
        <button class="delete" onclick="deleteVaccine(${index})">Excluir</button>`;
      document.getElementById('vaccine-list').appendChild(vaccineItem);
    });
  }

  // Atualizar a lista na inicialização da página
  updateVaccineList();
