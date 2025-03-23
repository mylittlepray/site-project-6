const questions = [
  {
    question: "Какой оператор используется для объявления переменной в JavaScript?",
    answers: ["var", "let", "const", "Все перечисленные"],
    correct: 3
  },
  {
    question: "Какой метод используется для вывода информации в консоль?",
    answers: ["console.log()", "print()", "alert()", "document.write()"],
    correct: 0
  },
  {
    question: "Какое значение возвращает typeof null?",
    answers: ["null", "object", "undefined", "number"],
    correct: 1
  },
  {
    question: "Что такое замыкание (closure) в JavaScript?",
    answers: ["Объект", "Функция вместе с лексическим окружением", "Метод массива", "Синтаксическая ошибка"],
    correct: 1
  },
  {
    question: "Как добавить элемент в конец массива?",
    answers: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0
  },
  {
    question: "Что делает оператор '==='?",
    answers: ["Сравнение без приведения типов", "Присваивание", "Логическое И", "Округление"],
    correct: 0
  },
  {
    question: "Как объявить функцию в ES6?",
    answers: ["function myFunc() {}", "let myFunc = () => {}", "const myFunc = function() {}", "Все варианты верны"],
    correct: 3
  },
  {
    question: "Что такое Promise?",
    answers: ["Строка", "Объект для работы с асинхронными операциями", "Метод массива", "Цикл"],
    correct: 1
  },
  {
    question: "Какой метод преобразует JSON в объект?",
    answers: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
    correct: 0
  },
  {
    question: "Что делает метод 'addEventListener'?",
    answers: ["Добавляет CSS-класс", "Создает новый элемент", "Регистрирует обработчик события", "Удаляет элемент"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const restartButton = document.getElementById("restart");

function loadQuestion() {
  const current = questions[currentQuestion];
  questionElement.textContent = `Вопрос ${currentQuestion + 1}: ${current.question}`;
  answersContainer.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer");
    button.onclick = () => checkAnswer(index);
    answersContainer.appendChild(button);
  });

  nextButton.style.display = "none";
}

function checkAnswer(index) {
  const buttons = document.querySelectorAll(".answer");
  buttons.forEach(button => button.disabled = true);

  const correctIndex = questions[currentQuestion].correct;

  if (index === correctIndex) {
    buttons[index].classList.add("correct");
    score++;
  } else {
    buttons[index].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  resultContainer.style.display = "block";
  resultText.textContent = `Правильных ответов: ${score} из ${questions.length}`;
}

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion();
});

loadQuestion();