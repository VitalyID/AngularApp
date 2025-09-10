// .prettierrc.js
module.exports = {
	tabWidth: 2, // Соответствует вашей настройке editor.tabSize
	useTabs: false, // Соответствует вашей настройке editor.insertSpaces: false
	semi: true, // Добавлять точки с запятой
	singleQuote: true, // Использовать одинарные кавычки
	trailingComma: 'es5', // Добавлять висячие запятые
	printWidth: 80, // Максимальная длина строки перед переносом (важно для "текст не переносится")
	arrowParens: 'always', // Всегда заключать параметры стрелочных функций в скобки
	bracketSpacing: true, // Добавлять пробелы внутри фигурных скобок объектов
	htmlWhitespaceSensitivity: 'css', // Как Prettier обрабатывает пробелы в HTML
	endOfLine: 'lf', // Стиль конца строки (Linux-style)
};
