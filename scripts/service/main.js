// Находим все элементы .line-code__top и .line-code__bott
const codedLines = document.querySelectorAll('.line-code__top, .line-code__bott');


codedLines.forEach(el => {
  const count = 100;
  const countBits = 10;

  // Делаем задержку 100 мс перед наполнением
  setTimeout(() => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      // Создаём контейнер для «столбца букв»
      const letterCol = document.createElement('div');
      letterCol.className = 'letter-col';
      letterCol.style.animationDuration = `${randomRange(2, 4)}s`;
      // Вставляем 4 случайных «бита»
      for (let j = 0; j < countBits; j++) {
        const span = document.createElement('p');
        span.textContent = randomRangeInt(0, 1).toString();
        letterCol.appendChild(span);
      }

      fragment.appendChild(letterCol);
    }

    // Одним разом встраиваем готовый фрагмент в элемент
    el.appendChild(fragment);
  }, 100);
});

// Функция генерации случайного числа с плавающей точкой
function randomRange(min, max) {
  return (min + (max - min) * Math.random()).toFixed(4);
}
function randomRangeInt(min, max) {
  return (min + (max - min) * Math.random()).toFixed(0);
}