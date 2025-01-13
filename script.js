// Получение данных посещений из LocalStorage
function getAttendanceData() {
    const data = localStorage.getItem('attendanceData');
    return data ? JSON.parse(data) : [];
}

// Сохранение новых данных в LocalStorage
function saveAttendanceData(data) {
    localStorage.setItem('attendanceData', JSON.stringify(data));
}

// Функция для добавления отметки
function markAttendance(event) {
    event.preventDefault(); // Отменяет стандартное поведение формы (перезагрузку)

    const name = document.getElementById('name').value;
    if (name.trim() !== '') {
        const attendanceData = getAttendanceData();
        const newMark = { name: name, date: new Date().toLocaleString() };
        attendanceData.push(newMark);
        saveAttendanceData(attendanceData);
        displayAttendance();
        backToMain();
    }
}

// Функция для отображения всех отметок
function displayAttendance() {
    const attendanceData = getAttendanceData();
    const tableBody = document.getElementById('attendance-table-body');
    tableBody.innerHTML = ''; // очищаем таблицу

    attendanceData.forEach(entry => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        const dateCell = document.createElement('td');
        dateCell.textContent = entry.date;

        row.appendChild(nameCell);
        row.appendChild(dateCell);
        tableBody.appendChild(row);
    });
}

// Переход на экран отметки
function showCheckInScreen() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('attendance-screen').style.display = 'none';
    document.getElementById('check-in-screen').style.display = 'block';
}

// Переход на экран посещений
function showAttendanceScreen() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('check-in-screen').style.display = 'none';
    document.getElementById('attendance-screen').style.display = 'block';
    displayAttendance();
}

// Переход на главную страницу
function backToMain() {
    document.getElementById('main-screen').style.display = 'block';
    document.getElementById('attendance-screen').style.display = 'none';
    document.getElementById('check-in-screen').style.display = 'none';
}

// Вызов функции при загрузке страницы для отображения всех отметок
window.onload = displayAttendance;

