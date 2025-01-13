// DOM элементы
const checkInButton = document.getElementById('check-in-button');
const viewAttendanceButton = document.getElementById('view-attendance-button');
const qrCodeDiv = document.getElementById('qr-code');
const nameForm = document.getElementById('name-form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const attendanceTable = document.getElementById('attendance-table');
const attendanceRecords = document.getElementById('attendance-records');

// Сохранённые данные
let attendanceData = JSON.parse(localStorage.getItem('attendance')) || [];

// Отобразить записи в таблице
function renderAttendance() {
    attendanceRecords.innerHTML = "";
    attendanceData.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${record.firstName}</td>
            <td>${record.lastName}</td>
            <td>${record.dateTime}</td>
        `;
        attendanceRecords.appendChild(row);
    });
}

// Показать/скрыть QR-код
checkInButton.addEventListener('click', () => {
    qrCodeDiv.classList.toggle('hidden');
    nameForm.classList.add('hidden');
});

// Отправка формы
nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const now = new Date().toLocaleString();
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (firstName && lastName) {
        attendanceData.push({ firstName, lastName, dateTime: now });
        localStorage.setItem('attendance', JSON.stringify(attendanceData));
        renderAttendance();
        firstNameInput.value = '';
        lastNameInput.value = '';
        qrCodeDiv.classList.add('hidden');
        alert('Вы успешно отметились!');
    } else {
        alert('Пожалуйста, введите имя и фамилию.');
    }
});

// Показать таблицу посещений
viewAttendanceButton.addEventListener('click', () => {
    qrCodeDiv.classList.add('hidden');
    attendanceTable.classList.toggle('hidden');
    renderAttendance();
});

// Инициализация
renderAttendance();
