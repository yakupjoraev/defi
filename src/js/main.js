// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)


// Массив слов для отображения
const words = ["Fintech", "BlockChain", "Defi", "MVP", "Startup"];
let currentWordIndex = 0; // Индекс текущего слова
let currentCharIndex = 0; // Индекс текущего символа
const typingSpeed = 150; // Скорость набора текста в миллисекундах
const erasingSpeed = 100; // Скорость стирания текста в миллисекундах
const delayBetweenWords = 2000; // Задержка между словами в миллисекундах

const wordElement = document.querySelector('.hero__word');

// Функция для набора слова
function typeWord() {
  if (currentCharIndex < words[currentWordIndex].length) {
    // Добавляем следующий символ к тексту
    wordElement.textContent += words[currentWordIndex].charAt(currentCharIndex);
    currentCharIndex++;
    // Продолжаем набор после небольшой задержки
    setTimeout(typeWord, typingSpeed);
  } else {
    // Пауза перед началом стирания
    setTimeout(eraseWord, delayBetweenWords);
  }
}

// Функция для стирания слова
function eraseWord() {
  if (currentCharIndex > 0) {
    // Удаляем последний символ из текста
    wordElement.textContent = words[currentWordIndex].substring(0, currentCharIndex - 1);
    currentCharIndex--;
    // Продолжаем стирание после небольшой задержки
    setTimeout(eraseWord, erasingSpeed);
  } else {
    // Переходим к следующему слову
    currentWordIndex = (currentWordIndex + 1) % words.length;
    // Начинаем набор нового слова после небольшой задержки
    setTimeout(typeWord, typingSpeed);
  }
}

// Начинаем эффект набора текста
typeWord();


const swiper = new Swiper(".comand__slider", {
  slidesPerView: 1.1,
  spaceBetween: 20,
  centeredSlides: true,


  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },

    // when window width is >= 640px
    991: {
      slidesPerView: 1.8,
      spaceBetween: 40,
    }
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.typing-animation');

  const observerOptions = {
    root: null, // Будет наблюдать за пересечением с viewport
    rootMargin: '0px',
    threshold: 0.1 // Запускать анимацию, когда элемент виден на 10%
  };

  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        startTypingAnimation(element);
        observer.unobserve(element); // Прекращаем наблюдение после запуска анимации
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  elements.forEach(element => {
    observer.observe(element);
  });

  function startTypingAnimation(element) {
    const originalHTML = element.innerHTML;
    const initialHeight = element.clientHeight;
    const typingSpeed = 40; // скорость набора текста в миллисекундах

    element.style.height = `${initialHeight}px`;
    element.innerHTML = ''; // Очистить содержимое перед началом анимации

    let currentIndex = 0;

    function typeWriter() {
      const displayHTML = originalHTML.substring(0, currentIndex + 1);
      element.innerHTML = displayHTML;

      currentIndex++;

      if (currentIndex < originalHTML.length) {
        // Проверяем, не находится ли текущий символ внутри тега
        while (originalHTML.charAt(currentIndex) === '<') {
          const endOfTag = originalHTML.indexOf('>', currentIndex);
          if (endOfTag === -1) break; // Некорректный HTML
          currentIndex = endOfTag + 1;
        }

        setTimeout(typeWriter, typingSpeed);
      }
    }

    typeWriter();
  }
});


document.querySelectorAll('.navbar__language').forEach(language => {
  language.addEventListener('click', function (e) {
    e.preventDefault();
    const selectedLang = this.getAttribute('data-lang');

    // Перенаправление на соответствующую страницу в зависимости от выбранного языка
    if (selectedLang === 'en') {
      window.location.href = '/eng/'; // Абсолютный путь к английской версии
    } else if (selectedLang === 'ru') {
      window.location.href = '/index.html'; // Абсолютный путь к русской версии
    }
  });
});



// function changeLanguage(lang) {
//   document.querySelectorAll('[data-key]').forEach(element => {
//     const key = element.getAttribute('data-key');
//     element.textContent = translations[lang][key];
//   });
// }
