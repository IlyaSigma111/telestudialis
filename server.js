const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Создаем приложение Express
const app = express();
const port = 3000;

// Подключаем body-parser для обработки POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Открываем или создаем базу данных
const db = new sqlite3.Database('./attendance.db', (err) => {
  if (err) {
    console.error("Ошибка при подключении к базе данных:", err);
  } else {
    console.log("Подключение к базе данных установлено!");
  }
});

// Создаем таблицу для посещений, если она не существует
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT)");
});

// Маршрут для добавления отметки
app.post('/add-attendance', (req, res) => {
  const { name } = req.body;
  const date = new Date().toISOString();

  const stmt = db.prepare("INSERT INTO attendance (name, date) VALUES (?, ?)");
  stmt.run(name, date, (err) => {
    if (err) {
      res.status(500).send("Ошибка при добавлении записи");
    } else {
      res.send("Запись о посещении добавлена");
    }
  });
  stmt.finalize();
});

// Маршрут для получения всех отметок
app.get('/get-attendance', (req, res) => {
  db.all("SELECT * FROM attendance ORDER BY date DESC", (err, rows) => {
    if (err) {
      res.status(500).send("Ошибка при получении данных");
    } else {
      res.json(rows); // Отправляем данные в формате JSON
    }
  });
});

// Статический файл для главной страницы
app.use(express.static('public'));

// Запускаем сервер
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
