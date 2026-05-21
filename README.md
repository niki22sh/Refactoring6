# Employee Management App

![CI/CD Pipeline](https://github.com/niki22sh/Refactoring6/actions/workflows/ci.yml/badge.svg)

Node.js додаток для управління працівниками з архітектурою Controller → Service → Repository.

---

## Зміст

- [Запуск через Docker](#запуск-через-docker)
- [Локальний запуск](#локальний-запуск)
- [Змінні середовища](#змінні-середовища)
- [Структура проєкту](#структура-проєкту)
- [Тести](#тести)
- [CI/CD](#cicd)

---

## Запуск через Docker

### Попередні вимоги

- [Docker](https://docs.docker.com/get-docker/) >= 24
- [Docker Compose](https://docs.docker.com/compose/) >= 2

### Запустити додаток з базою даних

```bash
docker-compose up --build
```

Додаток запуститься і виконає демонстраційні операції з працівниками.

### Запустити тільки тести в контейнері

```bash
docker-compose --profile test up tests --build
```

### Зупинити всі контейнери

```bash
docker-compose down
```

### Зупинити і видалити томи (скинути БД)

```bash
docker-compose down -v
```

---

## Локальний запуск

### Попередні вимоги

- [Node.js](https://nodejs.org/) >= 18

### Кроки

```bash
# 1. Встановити залежності
npm install

# 2. Запустити додаток
npm start

# 3. Запустити тести
npm test

# 4. Запустити лінтер
npm run lint
```

---

## Змінні середовища

| Змінна | Значення за замовчуванням | Опис |
|--------|--------------------------|------|
| `NODE_ENV` | `development` | Середовище виконання (`development`, `production`, `test`) |
| `APP_PORT` | `3000` | Порт, на якому слухає додаток |
| `MONGO_INITDB_DATABASE` | `employeedb` | Назва бази даних MongoDB |

Для локального запуску можна створити файл `.env`:

```env
NODE_ENV=development
APP_PORT=3000
```

---

## Структура проєкту

```
Refactoring5/
├── src/
│   ├── app.js                        # Точка входу
│   ├── controllers/
│   │   └── EmployeeController.js     # Обробка запитів
│   ├── services/
│   │   └── EmployeeService.js        # Бізнес-логіка
│   ├── repositories/
│   │   └── EmployeeRepository.js     # Доступ до даних
│   ├── models/
│   │   └── Employee.js               # Модель сутності
│   └── dto/
│       └── EmployeeDTO.js            # Data Transfer Object
├── tests/
│   └── EmployeeService.test.js       # Юніт-тести
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD
├── Dockerfile                        # Образ для запуску
├── Dockerfile.test                   # Образ для тестів
├── docker-compose.yaml               # Багатосервісне середовище
├── .eslintrc.json                    # Конфігурація лінтера
└── package.json
```

---

## Тести

### Запуск тестів

```bash
npm test
```

### Очікуваний результат

```
PASS  tests/EmployeeService.test.js
  EmployeeService Tests
    ✓ Register employee successfully
    ✓ Fail registration with invalid salary
    ✓ Find employee successfully
    ✓ Fail find nonexistent employee
    ✓ Update salary successfully
    ✓ Fail update with invalid salary
    ✓ Delete employee successfully
    ✓ Fail delete nonexistent employee

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
```

### Запуск з покриттям коду

```bash
npm test -- --coverage
```

Звіт про покриття буде збережено у папці `coverage/`.

---

## CI/CD

Конвеєр GitHub Actions (`.github/workflows/ci.yml`) виконує три етапи при кожному push/PR:

| Етап | Опис |
|------|------|
| **Lint** | Запускає ESLint для перевірки якості коду |
| **Test** | Виконує всі юніт-тести з генерацією coverage-звіту |
| **Build** | Будує Docker-образ та публікує його на Docker Hub (тільки `master`) |

### Секрети для Docker Hub (опціонально)

Для публікації образу на Docker Hub додайте в налаштування репозиторію:

- `DOCKERHUB_USERNAME` — ваш логін на Docker Hub
- `DOCKERHUB_TOKEN` — Access Token з Docker Hub

---

## Приклад виводу додатку

```
Employees added:
Employee { id: 1, name: 'Ivan Petrenko', department: 'IT', salary: 25000 }
Employee { id: 2, name: 'Maria Kovalenko', department: 'HR', salary: 18000 }

Find employee:
Employee { id: 1, name: 'Ivan Petrenko', department: 'IT', salary: 25000 }

Update salary:
Employee { id: 1, name: 'Ivan Petrenko', department: 'IT', salary: 30000 }

All employees:
[ Employee {...}, Employee {...} ]

Delete employee:
Employee { id: 2, name: 'Maria Kovalenko', department: 'HR', salary: 18000 }

Final list:
[ Employee { id: 1, name: 'Ivan Petrenko', department: 'IT', salary: 30000 } ]
```
