# 🗄️ webARHIVEsite

> 🤖 Этот проект на 100% сгенерирован с помощью ИИ. Простите меня.

Простой архив веб-сайтов для локального хостинга.

## 🚀 Быстрый старт

```bash
git clone -b stalker99699-list+ https://github.com/stalker99699/webARHIVEsite.git
cd webARHIVEsite
python3 list_update.py
```

## 📁 Структура

```text
webARHIVEsite/
├── index.html          # Главная страница
├── style.css           # Стили
├── list_update.py      # Скрипт обновления индекса
├── list/
│   ├── data.json       # ⚙️ Генерируется автоматически
│   └── sitename/       # Папка сайта
│       └── index.html  # Обязательный файл сайта
└── README.md
```

## ➕ Добавление сайта

1. Создайте папку: `list/my-site/`
2. Положите туда `index.html`
3. Запустите: `python3 list_update.py`
4. Готово

## ⚙️ list_update.py

Сканирует `list/`, находит сайты с `index.html`, обновляет `data.json`.  
Требования: Python 3.x, без зависимостей.

## 🛠️ Технологии

- HTML5 / CSS3
- Python 3.x (stdlib)
- Nginx (рекомендуется)

## 📄 Лицензия

MIT

> 💡 `data.json` не править вручную — перезапишется при обновлении.