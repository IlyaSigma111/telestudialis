// Получение DOM-элементов
const mainScreen = document.getElementById('main-screen');
const checkInScreen = document.getElementById('check-in-screen');
const attendanceScreen = document.getElementById('attendance-screen');
const checkInButton = document.getElementById('check-in-button');
const viewAttendanceButton = document.getElementById('view-attendance-button');
const backToMainFromCheckIn = document.getElementById('back-to-main-from-checkin');
const backToMainFromAttendance = document.getElementById('back-to-main-from-attendance');
const nameForm = document.getElementById('name-form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const attendanceRecords = document.getElementById('attendance-records');

// Локальное хранилище для данных посещений
let attendanceData = JSON.parse(localStorage.getItem('attendance')) || [];

// Локальный пользователь
let currentUser = null;

// Переходы между экранами
checkInButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    checkInScreen.classList.remove('hidden');
});

viewAttendanceButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    attendanceScreen.classList.remove('hidden');
    renderAttendance();
});

backToMainFromCheckIn.addEventListener('click', () => {
    checkInScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
});

backToMainFromAttendance.addEventListener('click', () => {
    attendanceScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
});

// Обновление таблицы посещений
function renderAttendance() {
    attendanceRecords.innerHTML = '';
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

// Сохранение отметок
nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const now = new Date().toLocaleString();
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (firstName && lastName) {
        currentUser = { firstName, lastName };
        attendanceData.push({ firstName, lastName, dateTime: now });
        localStorage.setItem('attendance', JSON.stringify(attendanceData));
        alert('Отметка сохранена!');
        nameForm.reset();
        checkInScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    } else {
        alert('Введите имя и фамилию!');
    }
});
