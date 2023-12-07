function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  
  function filtrarPorData() {
    const filtroData = document.getElementById('filtroData');
    const opcaoSelecionada = filtroData.value;
    
    showReminders(opcaoSelecionada);
  }
  
  function showReminders(filtroData) {
    const remindersTable = document.getElementById('remindersTable');
    const remindersBody = remindersTable.querySelector('tbody');
  
    // Limpar tabela antes de exibir os lembretes
    remindersBody.innerHTML = '';
  
    // Obter lembretes do localStorage
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  
    const dataAtual = new Date();
  
    reminders.forEach((reminder) => {
      const row = document.createElement('tr');
  
      // Formatando a data usando a função formatDate
      const formattedDate = formatDate(new Date(reminder.date));
  
      // Se não houver filtroData ou se o lembrete estiver dentro do intervalo selecionado, exibi-lo
      if (!filtroData || isReminderWithinRange(new Date(reminder.date), filtroData, dataAtual)) {
        row.innerHTML = `<td>${formattedDate}</td><td>${reminder.reminder || 'Sem lembrete'}</td>`;
        remindersBody.appendChild(row);
      }
    });
  
    if (reminders.length > 0) {
      // Mostrar a tabela
      remindersTable.style.display = 'table';
    } else {
      alert('Nenhum lembrete encontrado.');
    }
  }
  
  function isReminderWithinRange(dataLembrete, filtroData, dataAtual) {
    switch (filtroData) {
      case 'prox7dias':
        const dataLimite = new Date(dataAtual);
        dataLimite.setDate(dataLimite.getDate() + 7);
        return dataLembrete >= dataAtual && dataLembrete <= dataLimite;
      
      case 'prox1mes':
        const ultimoDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
        return dataLembrete >= dataAtual && dataLembrete <= ultimoDiaMes;
  
      case 'prox3meses':
        const dataLimite3Meses = new Date(dataAtual);
        dataLimite3Meses.setMonth(dataLimite3Meses.getMonth() + 3);
        return dataLembrete >= dataAtual && dataLembrete <= dataLimite3Meses;
  
      case 'prox1ano':
        const dataLimite1Ano = new Date(dataAtual);
        dataLimite1Ano.setFullYear(dataLimite1Ano.getFullYear() + 1);
        return dataLembrete >= dataAtual && dataLembrete <= dataLimite1Ano;
  
        case 'todos':
          // Caso 'todos', mostrar todos os lembretes
          return true;
    }
  }
  
  function pesquisarVacinas() {
    const termoPesquisa = document.getElementById("pesquisarVacinas").value.toLowerCase();
    const linhasTabela = document.querySelectorAll('#remindersTable tbody tr');
  
    linhasTabela.forEach(linha => {
      const textoLinha = linha.textContent.toLowerCase();
  
      // Mostrar a linha se o termo de pesquisa estiver presente, ocultar caso contrário
      const atendePesquisa = textoLinha.includes(termoPesquisa);
  
      if (atendePesquisa || filtroData === 'todos') {
        linha.style.display = '';
      } else {
        linha.style.display = 'none';
      }
    });
  }
  
  function visualizarTodos() {
    const linhasTabela = document.querySelectorAll('#remindersTable tbody tr');
  
    linhasTabela.forEach(linha => {
      linha.style.display = '';
    });
  }
  
  
  
  
