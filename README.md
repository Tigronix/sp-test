В сборщике используются:

- [Gulp4](https://gulpjs.com/)
- [Twig](https://twig.symfony.com/)
- [SASS/SCSS](http://sass-lang.com/)
- [Babel](https://babeljs.io/)

## Установка

Клонируем репозиторий, переходим в папку и вводим команду:

```sh
$ npm/yarn install
```

Менеджер пакетов Yarn можно скачать [отсюда](https://yarnpkg.com/en/docs/install). Чем отличаются yarn и npm можно узнать [здесь](http://prgssr.ru/development/yarn-ili-npm-vse-chto-vam-nuzhno-znat.html).
Затем запускаем сборку командой:

```sh
$ npm/yarn start (или просто gulp)
```

Запускается таск gulp'а по умолчанию - dev.

Конфиг [BrowserSync](https://browsersync.io/docs/gulp) в сборке:

```
browserSync: {
    port: PORT || 3000,
    open: !!OPEN,
    notify: false,
    reloadOnRestart: true,
    server: {
        baseDir: build.dest,
        directory: true
    }
}
```

Для запуска на другом порте введите в консоли:

```sh
PORT=8080 yarn start
```

Для открытия вкладки в браузере:

```sh
OPEN=true yarn start
```

Запуск команды gulp с флагом --production или --prod выполняет таски для продакшена - минифицирует CSS и JS, группирует медиазапросы, оптимизирует изображения. Для отмены минификации следует запустить --production --nominify.
Команда gulp build единожды собирает исходники в конечную папку. gulp clean удаляет папку build.

## Структура проекта

```
├── build/                     # Сборка (автогенерация)
│   ├── assets/                # Подключаемые ресурсы
│   │   ├── css/               # Стили
│   │   ├── favicon/           # Фавиконки
│   │   ├── fonts/             # Шрифты
│   │   ├── img/             # Изображения
│   │   └── js/                # Скрипты
│   └── index.html             # Страница
├── gulp/                      # Подключаемые скрипты с задачами для gulpfile.babel.js
│   ├── tasks/                 # Страницы
│   │   │── assets.js          # Копирование подключаемых ресурсов в build, сжатие изображений
│   │   │── build.js           # Запуск задач build
│   │   │── clean.js           # Удаление собранного билда
│   │   │── css.js             # Сборка стилей
│   │   │── dev.js             # Запуск задач dev
│   │   │── html.js            # Сборка html из twig
│   │   │── scripts.js         # Сборка скриптов
│   │   │── server.js          # Локальный сервер
│   │   │── sprites.js         # Сборка спрайтов
│   │   └── watch.js           # Отслеживание изменений и запуск задач
│   └── config.js              # Конфигурация для задач
├── src/                       # Исходные файлы
│   ├── assets/                # Подключаемые ресурсы
│   │   │── favicon/           # Фавикон
│   │   │── fonts/             # Шрифты
│   │   │── img/               # Изображения
│   │   │── png_icons/         # Иконки в png для генерации спрайтов
│   │   └── svg_icons/         # Иконки в svg для подключения на страницу
│   ├── css/                   # Стили
│   │   │── blocks/            # Стили блоков
│   │   │── _base.scss         # Базовые стили
│   │   │── _fonts.scss        # Подключение шрифтов
│   │   │── _mixins.scss       # Миксины
│   │   │── _png_sprite.scss   # Стили для спрайтов (автогенерация)
│   │   │── _variables.scss    # Переменные
│   │   └── _main.scss         # Импорт всех остальных файлов
│   ├── js/                    # Скрипты
│   │   │── scripts/           # Файлы скриптов
│   │   │── main.js            # Импорт скриптов из папки scripts
│   │   └── vendor.js          # Сторонние скрипты
│   ├── templates/             # Шаблоны twig
│   │   │── includes/          # Подключаемые шаблоны twig
│   │   │   └── icons.svg      # Собранные иконки для подключения на страницу (автогенерация)
│   │   └── base.twig          # Базовый шаблон
│   └── index.twig             # Страница
├── .babelrc                   # Конфигурация Babel
├── .editorconfig              # Конфигурация настроек редактора кода
├── .gitignore                 # Список исключённых файлов из git
├── gulpfile.babel.js          # Файл для запуска gulp
├── package.json               # Список зависимостей и другой информации
└── readme.md                  # Документация
```

## JavaScript

Для подключения js скриптов используется [gulp-include](https://www.npmjs.com/package/gulp-include) (т.к. в сборщике нет Webpack'а, скрипты не собираются в один бандл, для этого как раз и нужен gulp-include).
Рекомендуется использовать менеджер пакетов для добавления сторонних скриптов в проект. Подключение в vendor.js осуществляется таким образом:

```
//=require jquery/dist/jquery.min.js (пример подключения из node_modules)
```

Примеры подключения есть в стартовой сборке, файлы main.js и vendor.js удалять не следует.
В скриптах допускается использовать ES6 синтаксис, Babel все обработает, на выходе получите ES5 версию.

## PNG

PNG-спрайт также собирается автоматически, для этого нужно положить картинку в src/assets/png_icons и прописать стили:

```sass
.icon-email {
    @include sprite($icon-email);
}
```

## SVG

SVG иконки собираются в один файл и подключаются инлайново в базовом шаблоне twig. Иконки нужно располагать в src/assets/svg_icons, конечный файл лежит в src/templates/includes/icons.svg.
Для кроссбраузерности установлена библиотека svg4everybody.
