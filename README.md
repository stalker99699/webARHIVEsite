# webARHIVEsite
🤖 Этот проект на 100% сгенерирован с помощью ИИ. Простите меня. / 🤖 This project is 100% AI-generated. Forgive me.

🌐 **webARHIVEsite** — легковесный веб-архив для хранения и каталогизации сайтов. Протестировано на Ubuntu Server 24 + Nginx.

## 🚀 Особенности

- 📂 Простое добавление — просто скопируй файлы в папку
- ⚡ Автообновление списка через Python-скрипт
- 🎨 Минимализм: HTML + CSS
- 🐧 Linux-friendly

## 📁 Структура

```text
.
├── index.html          # Главная страница
├── style.css           # Стили
├── list_update.py      # Скрипт обновления data.json
├── list/
│   ├── data.json       # Метаданные сайтов (генерируется)
│   └── <имя_сайта>/    # Папка сайта
│       └── index.html  # Файл сайта
└── README.md
```

## ⚙️ Установка

1. Клонируй в директорию веб-сервера:
   ```bash
   git clone https://github.com/stalker99699/webARHIVEsite.git /var/www/webARHIVEsite
   ```

2. Конфиг Nginx:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;
       root /var/www/webARHIVEsite;
       index index.html;
   }
   ```

3. Рестарт: `sudo systemctl restart nginx`

## 📥 Как добавить сайт

1. Создай папку в `list/` — её имя станет названием в каталоге.
2. Положи внутрь `index.html` и остальные файлы сайта.
3. Запусти: `python3 list_update.py`
4. Сайт появится на главной.

## 📜 Лицензия

MIT.
