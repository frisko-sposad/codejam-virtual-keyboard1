let language = localStorage.getItem('keyboard-lang');
const langs = ['En', 'Ru'];
if (!langs.includes(language)) language = 'En';

const textarea = document.createElement('textarea');
const text = [];

textarea.classList.add('textarea');
textarea.setAttribute('disabled', 'disabled');
document.body.append(textarea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.append(keyboard);

class Key {
  constructor(code, En, Ru, print) {
    this.code = code;
    this.En = En;
    this.Ru = Ru;
    this.print = print;
  }
}

const buttons = [
  new Key('Backquote', '`', 'ё', true),
  new Key('Digit1', '1', '1', true),
  new Key('Digit2', '2', '2', true),
  new Key('Digit3', '3', '3', true),
  new Key('Digit4', '4', '4', true),
  new Key('Digit5', '5', '5', true),
  new Key('Digit6', '6', '6', true),
  new Key('Digit7', '7', '7', true),
  new Key('Digit8', '8', '8', true),
  new Key('Digit9', '9', '9', true),
  new Key('Digit0', '0', '0', true),
  new Key('Minus', '-', '-', true),
  new Key('Equal', '=', '=', true),
  new Key('Backslash', '/', '/', true),
  new Key('Backspace', '←', '←', false),
  new Key('Tab', 'Tab', 'Tab', false),
  new Key('KeyQ', 'q', 'й', true),
  new Key('KeyW', 'w', 'ц', true),
  new Key('KeyE', 'e', 'у', true),
  new Key('KeyR', 'r', 'к', true),
  new Key('KeyT', 't', 'е', true),
  new Key('KeyY', 'y', 'н', true),
  new Key('KeyU', 'u', 'г', true),
  new Key('KeyI', 'i', 'ш', true),
  new Key('KeyO', 'o', 'щ', true),
  new Key('KeyP', 'p', 'з', true),
  new Key('BracketLeft', '[', 'х', true),
  new Key('BracketRight', ']', 'ъ', true),
  new Key('Delete', 'Del', 'Del', false),
  new Key('CapsLock', 'Caps', 'Caps', false),
  new Key('KeyA', 'a', 'ф', true),
  new Key('KeyS', 's', 'ы', true),
  new Key('KeyD', 'd', 'в', true),
  new Key('KeyF', 'f', 'а', true),
  new Key('KeyG', 'g', 'п', true),
  new Key('KeyH', 'h', 'р', true),
  new Key('KeyJ', 'j', 'о', true),
  new Key('KeyK', 'k', 'л', true),
  new Key('KeyL', 'l', 'д', true),
  new Key('Semicolon', ';', 'ж', true),
  new Key('Quote', "'", 'э', true),
  new Key('Enter', 'Enter', 'Enter', false),
  new Key('ShiftLeft', 'Shift', 'Shift', false),
  new Key('KeyZ', 'z', 'я', true),
  new Key('KeyX', 'x', 'ч', true),
  new Key('KeyC', 'c', 'с', true),
  new Key('KeyV', 'v', 'м', true),
  new Key('KeyB', 'b', 'и', true),
  new Key('KeyN', 'n', 'т', true),
  new Key('KeyM', 'm', 'ь', true),
  new Key('Comma', ',', 'б', true),
  new Key('Period', '.', 'ю', true),
  new Key('Slash', '/', '.', true),
  new Key('ShiftRight', 'Shift', 'Shift', false),
  new Key('ControlLeft', 'Ctrl', 'Ctrl', false),
  new Key('MetaLeft', 'Win', 'Win', false),
  new Key('AltLeft', 'Alt', 'Alt', false),
  new Key('Space', ' ', ' ', true),
  new Key('AltRight', 'Alt', 'Alt', false),
  new Key('ArrowLeft', '←', '←', true),
  new Key('ArrowDown', '↓', '↓', true),
  new Key('ArrowUp', '↑', '↑', true),
  new Key('ArrowRight', '→', '→', true),
  new Key('ControlRight', 'Ctrl', 'Ctrl', false),
];

function createKeyboard() {
  for (let i = 0; i < buttons.length; i++) {
    if (language === 'En') keyboard.children[i].textContent = buttons[i].En;
    if (language === 'Ru') keyboard.children[i].textContent = buttons[i].Ru;
  }
}

for (let i = 0; i < buttons.length; i++) { // задаём размер кнопок
	const keyboardButton = document.createElement('div');
	keyboardButton.classList.add('keyboard__button');

	switch (buttons[i].code) {
		case 'AltLeft':
		case 'AltRight':
		case 'MetaLeft':
		case 'ControlLeft':
		case 'ControlRight':
			keyboardButton.classList.add('keyboard__button5');
      break;


		case 'Delete':
		case 'Tab':
			keyboardButton.classList.add('keyboard__button6');
			break;

		case 'CapsLock':
		case 'Enter':
			keyboardButton.classList.add('keyboard__button8');
			break;

		case 'ShiftLeft':
		case 'ShiftRight':
			keyboardButton.classList.add('keyboard__button10');
			break;

		case 'Space':
			keyboardButton.classList.add('keyboard__button19');
			break;

		default:
			keyboardButton.classList.add('keyboard__button4');
			break;
	}

	keyboardButton.dataset.code = buttons[i].code;
	keyboardButton.dataset.En = buttons[i].En;
	keyboardButton.dataset.Ru = buttons[i].Ru;
	keyboardButton.dataset.print = buttons[i].print;
	if (language === 'En') keyboardButton.textContent = buttons[i].En;
	if (language === 'Ru') keyboardButton.textContent = buttons[i].Ru;
	keyboard.appendChild(keyboardButton);
}

// Функция вывода символа
function printLetter(currentKey) {
  const letter = (language === 'En') ? currentKey.dataset.En : currentKey.dataset.Ru;
  if (currentKey.dataset.code === 'Tab') text.push('\t');
  if (currentKey.dataset.code === 'Enter') text.push('\r\n');
  if (currentKey.dataset.code === 'Backspace') {
    text.pop();
    textarea.textContent = text.join('');
  }
    if (currentKey.dataset.print === 'false') {
      return;
  }
  text.push(letter);
  textarea.textContent = text.join('');
}

// Отпускаем кнопку реальной клавиатуры
document.addEventListener('keydown', (event) => {
  const currentKey = document.querySelector(`[data-code="${event.code}"]`);
  if (currentKey != null) {
  currentKey.classList.add('active');
  printLetter(currentKey);
  }
});
// Нажимаем кнопку реальной клавиатуры
document.addEventListener('keyup', (event) => {
  const button = document.querySelector(`[data-code="${event.code}"]`);
  if (button != null) button.classList.remove('active');
});

// Клик мышкой на кнопку виртуальной клавиатуры
keyboard.addEventListener('click', (event) => {
  if (event.target.classList.contains('keyboard__button')) {
      printLetter(event.target);
  }
});

// Функция смены языка и обновления символов кравиатуры
function changeLanguage() {
  language = (language === 'Ru') ? 'En' : 'Ru';
  localStorage.setItem('keyboard-lang', language);
  createKeyboard();
}

// Переключения языка проверка на 2 нажатие
function runOnKeys(func, ...codes) {
  const dublKeys = new Set();

  document.addEventListener('keydown', (event) => {
    dublKeys.add(event.code);

    for (let i = 0; i < codes.length; i++) { // все ли клавиши из набора нажаты?
      if (!dublKeys.has(codes[i])) {
        return;
      }
    }
    // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш
    dublKeys.clear();
    func();
  });

  document.addEventListener('keyup', (event) => {
    dublKeys.delete(event.code);
  });
}

runOnKeys(
  () => changeLanguage(),
  'ShiftLeft',
  'AltLeft',
);
