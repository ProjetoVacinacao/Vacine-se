

const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div');

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }

    day.onclick = () => {
      const selectedDate = new Date(year, month, i - first_day.getDay() + 1);
      console.log('Selected Date:', selectedDate); // Adicionando log para depuração
      updateSelectedDate(selectedDate);
      resetSelectedDates();
      day.classList.add('selected-date');
    };

    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});

(function() {
  month_list.classList.add('hideonce');
})();

document.querySelector('#pre-year').onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

document.querySelector('#next-year').onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayDateElement = document.getElementById('todayDate');
const selectedDateElement = document.getElementById('selectedDate');

const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    // Se a data não for válida, retorna uma string indicando isso
    console.log('inv', date);
    return 'Data Inválida';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 porque os meses começam do zero
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Atualiza as datas quando a página é carregada
selectedDateElement.textContent = formatDate(new Date());

const updateSelectedDate = (date) => {
  selectedDateElement.textContent = formatDate(date);
};

month.onclick = () => {
  resetSelectedDates();
  updateSelectedDate(new Date(currentYear.value, currentMonth.value, 1));
};

const resetSelectedDates = () => {
  const selectedDates = document.querySelectorAll('.selected-date');
  selectedDates.forEach((date) => {
    date.classList.remove('selected-date');
  });
}

function addReminder() {
  console.log('Função addReminder chamada!');  // Linha de depuração
  const selectedDate = document.querySelector('.selected-date');
  if (selectedDate) {
    const day = parseInt(selectedDate.textContent); // Convertendo para número inteiro
    const month = currentMonth.value; // Não é necessário adicionar 1 aqui, pois currentMonth já é base 0
    const year = currentYear.value;
    const reminderInput = document.getElementById('reminderInput').value;

    // Verificar se day, month e year são números antes de continuar
    if (!isNaN(day) && !isNaN(month) && !isNaN(year) && reminderInput.trim() !== '') {
      // Criar um novo objeto Date usando year, month e day
      const selectedDateObject = new Date(year, month, day);

      // Verificar se o objeto Date é válido
      if (!isNaN(selectedDateObject.getDate())) {
        // Formatando a data como dd/mm/aaaa antes de salvar
        const formattedDate = formatDate(selectedDateObject);

        // Salvando no localStorage
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminders.push({ date: selectedDateObject.getTime(), reminder: reminderInput });
        localStorage.setItem('reminders', JSON.stringify(reminders));

        // Limpando o input após adicionar o lembrete
        document.getElementById('reminderInput').value = '';

        // Atualizando a exibição dos lembretes
        showReminders();

        // Exibindo mensagem de sucesso
        alert('Lembrete adicionado com sucesso!');
      } else {
        alert('Data inválida. Selecione uma data válida.');
      }
    } else {
      alert('Selecione uma data e insira um lembrete antes de adicionar.');
    }
  }
}
function showReminders() {
  const remindersTable = document.getElementById('remindersTable');
  const remindersBody = remindersTable.querySelector('tbody');

  // Limpar tabela antes de exibir os lembretes
  remindersBody.innerHTML = '';

  // Obter lembretes do localStorage
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];

  // Adicionar lembretes à tabela
  reminders.forEach((reminder) => {
    const row = document.createElement('tr');

    // Formatando a data usando a função formatDate
    const formattedDate = formatDate(new Date(reminder.date));

    row.innerHTML = `<td>${formattedDate}</td><td>${reminder.reminder || 'Sem lembrete'}</td>`;
    remindersBody.appendChild(row);
  });

  // Mostrar a tabela
  remindersTable.style.display = 'table'; // Alteração aqui

  // Desabilitar o botão "Visualizar Lembretes"
  document.getElementById('visualizarLembretesBtn').disabled = true;
}
function clearReminders() {
  const remindersTable = document.getElementById('remindersTable');
  const remindersBody = remindersTable.querySelector('tbody');

  // Limpar tabela
  remindersBody.innerHTML = '';

  // Ocultar a tabela
  remindersTable.style.display = 'none';

  // Reabilitar o botão "Visualizar Lembretes"
  document.getElementById('visualizarLembretesBtn').disabled = false;
}
