import os
import json
import signal
import time
import sys

def update_data():
    sites = []
    list_dir = 'list'
    
    try:
        # Сканируем директорию
        for dir_name in os.listdir(list_dir):
            dir_path = os.path.join(list_dir, dir_name)
            if os.path.isdir(dir_path):
                index_path = os.path.join(dir_path, 'index.html')
                if os.path.exists(index_path):
                    sites.append({
                        "name": dir_name,
                        "url": f"list/{dir_name}/index.html",
                        "description": f"Standalone site: {dir_name}"
                    })
        
        # Записываем в JSON
        with open('data.json', 'w') as f:
            json.dump(sites, f, indent=4)
        
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Обновлено: {len(sites)} сайтов")
        
    except Exception as e:
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Ошибка: {e}")

def signal_handler(signum, frame):
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Получен сигнал {signum}. Завершение...")
    sys.exit(0)

def main():
    # Регистрируем обработчики сигналов
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Сканер запущен. Интервал: 60 сек.")
    print("Для остановки: Ctrl+C или kill")
    
    while True:
        update_data()
        
        # Ждем 60 секунд, но с проверкой каждую секунду для быстрого реагирования на сигналы
        for _ in range(60):
            time.sleep(1)

if __name__ == "__main__":
    main()
